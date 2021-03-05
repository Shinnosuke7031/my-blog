---
slug: scala-akka-easy-api
title: (Scala + Akka HTTP編)バックエンド初心者が簡単なAPIを作って学ぶ
description: 色んな言語触ってAPI作ってみたいなーと思い(Go, Kotlin, Django, Flask, Express, ...)、その第1回はScalaで書いてみようと思いました。そこで、ScalaでAPIを作るのに便利なライブラリAkkaがあるとのことなので、これを使っていきます。 
date: 2021/2/27
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fscala-4.svg?alt=media&token=e9fcdc29-e9a0-4a82-bbcf-571ee2b18c6d
type: tech
tag: 
- Scala
- バックエンド
---

# はじめに
春休みに入って時間に少し余裕が出てきました(学会や論文書いたりしなきゃいけないが。。。)


色んな言語触ってAPI作ってみたいなーと思い(Go, Kotlin, Django, Flask, Express, ...)、その第1回はScalaで書いてみようと思いました。  

そこで、ScalaでAPIを作るのに便利なライブラリ`Akka`があるとのことなので、これを使っていきます。  

そもそもJavaは普段あまり使わなく、Scalaも[こちら](https://hexx.github.io/scala_text/)で勉強した程度です。  

良くない部分がありましたら、ぜひ教えてください。  

# 前提と目標
javaが動く環境は用意できている前提で書いていきます。  

ビルドにはsbtを使っていきます。

また、[公式のドキュメント](https://doc.akka.io/docs/akka-http/current/introduction.html)を参考に行います。

ゴールは、
- `curl -H "Content-Type: application/json" -X POST -d '{"items":[{データ1},{データ2}]}' http://localhost:8080/create-order`と叩くと、DB(MySQL)に保存される
- `curl http://localhost:8080/item/[値]`と叩くとDB(MySQL)から`[値]`に対応したJsonデータを返す

# 動作確認
まず、`build.sbt`を作成し、ビルドの準備をします。
```scala:build.sbt
scalaVersion := "2.13.4"

val AkkaVersion = "2.6.8"
val AkkaHttpVersion = "10.2.3"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
)
```
また、`/src/main/scala/Sever.scala`を作成します。
```scala:Sever.scala
package docs.http.scaladsl

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import scala.io.StdIn

object HttpServerRoutingTest {

  def main(args: Array[String]): Unit = {

    implicit val system = ActorSystem(Behaviors.empty, "my-system")
    
    implicit val executionContext = system.executionContext

    val route =
      path("hello") {
        get {
          complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Hello akka-http world!!</h1>"))
        }
      }

    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine()
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}
```
ターミナルで`sbt run`と打つと実行されます。そして、ブラウザで`http://localhost:8080/hello`をみてみると、「Hello akka-http world!!」と表示されます！

これでサーバーを起動できましたね。

Returnキーを押すとシャットダウン。

## Jsonを返す
やはり、最近のAPIはJson形式のものがほとんどだと思うので、AkkaでもJsonを扱っていきたいと思います。

## ビルドの準備
まず、Json関連のライブラリを使えるように、`build.sbt`を変更します。
```scala:build.sbt
scalaVersion := "2.13.4"

val AkkaVersion = "2.6.8"
val AkkaHttpVersion = "10.2.3"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % AkkaHttpVersion//これを追加
)
```
## Jsonとルートの設定
今回は動作確認で作成した`Server.scala`の他に、`src/main/scala/jsonservice/`に`JsonService.scala`と`JsonMethods.scala`の2つを新たに作成します。

まず、`JsonMethods.scala`についてです。
```scala:JsonMethods.scala
package jsonmethods

import akka.http.scaladsl.Http
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.Done
import akka.http.scaladsl.model.StatusCodes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

import scala.concurrent.Future
// 扱うデータのモデル
final case class Item(name: String, id: Long)
final case class Order(items: List[Item])
// Json扱うために必要
trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val itemFormat = jsonFormat2(Item)
  implicit val orderFormat = jsonFormat1(Order)
}
// 後述するJsonServiceでリクエスト時に扱うメソッド
trait JsonMethods extends JsonSupport {
  // 必須
  implicit val system = ActorSystem(Behaviors.empty, "SprayExample")
  implicit val executionContext = system.executionContext
  
  var orders: List[Item] = Nil
　// 引数と一致するIDのデータを取得
  def fetchItem(itemId: Long): Future[Option[Item]] = Future {
    orders.find(o => o.id == itemId)
  }
  // 引数のデータをitemsに追加する
  def saveOrder(order: Order): Future[Done] = {
    orders = order match {
      case Order(items) => items ::: orders
      case _            => orders
    }
    Future { Done }
  }
}
```
次に、`JsonService.scala`です。
```scala:JsonService.scala
package jsonservice

import akka.http.scaladsl.server.Directives
import akka.Done
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes

import scala.concurrent.Future

import jsonmethods._

trait JsonService extends Directives with JsonMethods {

  val route: Route =
    concat(
      get {
        pathPrefix("item" / LongNumber) { id =>
          val maybeItem: Future[Option[Item]] = fetchItem(id)
          onSuccess(maybeItem) {
            case Some(item) => {complete(item)}
            case None       => complete(StatusCodes.NotFound)
          }
        }
      },
      post {
        path("create-order") {
          entity(as[Order]) { order =>
            val saved: Future[Done] = saveOrder(order)
            onSuccess(saved) { _ => {
              complete("saved completely")
            }}
          }
        }
      }
    )
}
```
## 動作確認
実行する前に、`/src/main/scala/Sever.scala`の内容を変更しましょう。
```scala:Sever.scala
import akka.http.scaladsl.Http

import scala.io.StdIn

import jsonservice.JsonService

object JsonTest extends App with JsonService {

  val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)
  println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
  StdIn.readLine() // let it run until user presses return
  bindingFuture
    .flatMap(_.unbind()) // trigger unbinding from the port
    .onComplete(_ => system.terminate()) // and shutdown when done
}
```
だいぶスッキリしましたね！

それでは、`sbt run`と打って実行しましょう。

サーバーが起動したら、

`curl -H "Content-Type: application/json" -X POST -d '{"items":[{"name":"aaaaa","id":10},{"name":"bbbbb","id":0}]}' http://localhost:8080/create-order`

と新規ターミナルで打ちましょう。

このコマンドで、
```json:
[
  {"name" : "aaaaa", "id" : 10}
  {"name" : "bbbbb", "id" : 0}
]
```
をPOSTで送ります。

すると、

`saved completely`

とレスポンスがあると思います。

次に、

`curl http://localhost:8080/item/10`

と打つと、idが10のJsonデータが返ってきます！

# MySQLとの連携
## slickの設定
DBと連携するために、`Slick`というライブラリを使いますので、`build.sbt`に追記します。
```scala:build.sbt
scalaVersion := "2.13.4"

val AkkaVersion = "2.6.8"
val AkkaHttpVersion = "10.2.3"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % AkkaHttpVersion
  //以下を追加
  "com.typesafe.slick" %% "slick" % "3.3.3",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.3.3",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "mysql" % "mysql-connector-java" % "6.0.6"
)
```
また、slickの設定を`/src/main/resources/application.conf`に書いていきます。

MySQLの環境は各自で用意お願いします。私は、DockerでMySQLのコンテナを立ち上げてます。
```conf:application.conf
slick-mysql = {
  driver = "com.mysql.cj.jdbc.Driver",
  url = "jdbc:mysql://localhost:[ポート番号]/[データベース名]?autoReconnect=true&useSSL=false",
  user = "ユーザー名",
  password = "パスワード",
  connectionPool = "disabled",
}
```
↓↓↓↓今回用意したテーブル「TEST」はこんな感じです↓↓↓↓
```none
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(100) | YES  |     | NULL    |                |
| num   | int(11)      | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
```
## MySQLと接続
MySQLと接続し、操作するためのコードをに`/src/main/scala/database/MysqlService.scala`書きます。
```scala:MysqlService.scala
package database

import akka.actor.typed.scaladsl.Behaviors

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

import slick.jdbc.MySQLProfile.api._

final case class Item(id: Option[Int], name: String, num: Int)// ここもTableに応じて変更
final case class Order(items: List[Item])

trait MysqlService extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val system = akka.actor.typed.ActorSystem(Behaviors.empty, "DatabaseExample")
  implicit val executionContext = system.executionContext
  // application.confから読み込み
  protected  val db = Database.forConfig("slick-mysql")
  // Json
  implicit val itemFormat = jsonFormat3(Item)
  implicit val orderFormat = jsonFormat1(Order)
  // Tableの仕様
  class Tests(tag: Tag) extends Table[Item](tag, "TEST") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def num = column[Int]("num")
    def * = (id.?, name, num) .<> (Item.tupled, Item.unapply)
  }
  // Tableを操作するのに使います
  val tests = TableQuery[Tests]
}
```

## MySQLの操作
今回はデータベースを扱うので、全章で作った`JsonService.scala`と`JsonMethods.scala`を少し変えていく必要があります。
```scala:JsonService.scala
package jsonservice

import akka.http.scaladsl.server.Directives
import akka.Done
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes

import scala.concurrent.Future

import jsonmethods.JsonMethods
import database.{Item, Order}

trait JsonService extends Directives with JsonMethods {

  val route: Route =
    concat(
      get {
        pathPrefix("item" / IntNumber) { num =>
          val maybeItem: Future[Option[Item]] = fetchItem(num)
          onSuccess(maybeItem) {
            case Some(item) => {complete(item)}
            case None       => complete(StatusCodes.NotFound)
          }
        }
      },
      post {
        path("create-order") {
          entity(as[Order]) { order =>
            val saved: Future[Done] = saveOrder(order)
            onSuccess(saved) { _ => {
              complete("saved completely")
            }}
          }
        }
      }
    )
}
```
`pathPrefix("item" / IntNumber)`の部分が変わりましたね。
```scala:JsonMethods.scala
package jsonmethods

import akka.Done
import scala.concurrent.Future

import database._
import slick.jdbc.MySQLProfile.api._

trait JsonMethods extends MysqlService {

  def fetchItem(itemNum: Int): Future[Option[Item]] = db.run(
    tests.filter(_.num === itemNum).result.headOption
  )

  def saveOrder(order: Order): Future[Done] = {
    order.items.foreach(item => item match {
      case Item(id, name, num) => db.run(TestsTableAutoInc += item)
      case _ => None
    })
    
    Future { Done }
  }
  // AutoIncrementするために必要
  protected def TestsTableAutoInc = tests returning tests.map(_.id)
}
```
`db.run(...)`と記述するとデータベースを操作できるんですね!
## 動作確認
それでは、`sbt run`と打って実行しましょう。

サーバーが起動したら、

`curl -H "Content-Type: application/json" -X POST -d '{"items":[{"name":"aaaaa","num":10},{"name":"bbbbb","num":0}]}' http://localhost:8080/create-order`

と新規ターミナルで打ちましょう。

すると、`saved completely`とレスポンスがあると思います。

次に、`curl http://localhost:8080/item/10`と打つと、numが10のJsonデータが返ってきます！

全章と違うのは、DB(MySQL)からデータを持ってきてるので、サーバーを落としても保存したデータは消えません。

# まとめ
春休み企画(仮)の第１弾として、Scalaを学ぶために「Scala + Akka HTTP」で簡単なAPIを作ってみました。

Reactを触り始めた頃を思い出しましたww

Scalaは、基本をわかってないと至る所でハマってしまい難しいなと感じました。

しかし、DBの接続からJsonを返すところまでコンパクトに書けることに感動しました。

今回で、Scalaとの距離が縮まったと思うので、これからも仲良くできたらいいな。。。

Scalaはまだまだ初心者なので、今回のコードでNGな部分やもっと上手くかけるところがありましたらアドバイスお願いします🤲

追記：使用したプログラム[こちら](https://github.com/Shinnosuke7031/scala-akka-study)


