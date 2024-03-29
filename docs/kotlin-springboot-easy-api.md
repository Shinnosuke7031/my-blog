---
slug: kotlin-springboot-easy-api
title: (Kotlin + Spring Boot編)バックエンド初心者が簡単なAPIを作って学ぶ
description: バックエンド初心者がKotlin + Spring Bootで簡単なAPIを作ったので、その記録をまとめました。
date: 2021/2/27
imgpath: https://drive.google.com/uc?id=1Qmial0EbZ4R5ZDiQj90F40xGgGpe6xs2
type: tech
tag:
  - Kotlin
  - バックエンド
---

# はじめに

春休みに入って時間に少し余裕が出てきたため、色んな言語触って API 作ってみたいなーと思いました。
その第 2 回は Kotlin で書いてみようと思いました。

もはや説明する必要もないくらい、色んなサービスや Android アプリで広く使われています。
僕も一度は触ってみたかったので、春休み企画(仮)では絶対使うと決めてました。

使うフレームワークは Spring Boot です。

java が動く環境や IntelliJ IDEA は用意できている前提で書いていきます。

ゴールは、

- curl -H "Content-Type: application/json" -X POST -d '{[{データ 1},{データ 2}]}' http://localhost:8080/create-order と叩くと、DB(MySQL)に保存される
- curl http://localhost:8080/item/[値] と叩くと DB(MySQL)から[値]に対応した Json データを返す

# 動作確認

## Spring Iinitializr

まずは、アプリケーションの雛形を作っていきましょう。
Dependencies で、`Spring WEB` `Spling Data JPA` `MySQL Driver`を選択します。
![spring initializr](https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fspringbootinit.png?alt=media&token=02ec186b-a6d6-4f9f-b305-cb144598c44f 'spring initializr')
雛形をダウンロードできたら、IntelliJ IDEA で開きましょう。

## Controller の作成

`com.example.demo`に`controller`パッケージを作り、`DemoController.kt`を作成します。

```kotlin:DemoController.kt
package com.example.demo.controller
import com.example.demo.repository.DemoRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class DemoController(private val demoRepository: DemoRepository) {
    @GetMapping("/hello")
    fun createNewDemo(): ResponseEntity<String> =
        ResponseEntity.ok("Hello World.")
}
```

## サーバー起動

動かすとサーバーが起動します。
ターミナルで、`curl http://localhost:8080/api/hello`と入力すると、「Hello World.」と表示されます。
これで動作確認できましたね！

# API の作成

## MySQL との連携

MySQL の環境は各自で用意お願いします。
私は、Docker で MySQL のコンテナを立ち上げてます。

`application.properties`に MySQL と接続する設定を書いていきます。

```:application.properties
spring.datasource.url = jdbc:mysql://localhost:13306/root?useSSL=false
spring.datasource.username = root
spring.datasource.password = root
spring.datasource.driver-class-name = com.mysql.cj.jdbc.Driver

spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect

spring.jpa.hibernate.ddl-auto = update
```

## Model の作成

`com.example.demo`に`model`パッケージを作り、`Demo.kt`を作成します。

```kotlin:Demo.kt
package com.example.demo.model

import javax.persistence.*

@Entity
@Table(name = "test")
data class Demo(@Id @GeneratedValue var id: Long? = 0,
                @Column(nullable = false) var name: String = "",
                @Column(nullable = false) var num: Int = 0) {
}
```

## Repository の作成

`com.example.demo`に`repository`パッケージを作り、`DemoRepository.kt`を作成します。

```kotlin:DemoRepository.kt
package com.example.demo.repository

import com.example.demo.model.Demo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DemoRepository: JpaRepository<Demo, Long>
```

## Controller 変更

先ほど作成した`DemoController.kt`を MySQL の情報を返すように変更します。

```kotlin:DemoController.kt
package com.example.demo.controller
import com.example.demo.model.Demo
import com.example.demo.repository.DemoRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class DemoController() {

    @GetMapping("/item/{num}")
    fun getDemoById(@PathVariable(value = "num") number: Int): ResponseEntity<Demo> {
        val res = demoRepository.findAll().filter { el -> el.num == number }
        if (res.isNotEmpty()) res.forEach{ e -> return ResponseEntity.ok(e) }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/create-order")
    fun createNewDemo(@RequestBody data: Demo): Demo =
        demoRepository.save(data)
}
```

## サーバー起動

動かすとサーバーが起動します。
ターミナルで、

```none
curl -H "Content-Type: application/json" -X POST -d '{"name": "hoge", "num": 10}' http://localhost:8080/api/create-order
curl -H "Content-Type: application/json" -X POST -d '{"name": "hogehoge", "num": 100}' http://localhost:8080/api/create-order
```

と打つと、MySQL に保存され、

```none
curl http://localhost:8080/api/item/10
```

と打つと、先ほど保存したデータで、`"num"`が`10`のデータが返ってきます。
これで完成ですね！

# まとめ

前回使った[Scala + Akka HTTP 編](https://nosuke-blog.site/blog/scala-akka-easy-api)と比較すると、非常に簡単に API を作ることができました。

やはり、

- Scala : Java を進化させた言語
- Kotlin : Java をもっと簡単に安全に
  というような違い(私の考えです。違ってたらごめんなさい)を実際に感じれたなと思います。

普段の研究では、C++を使っているため、Java には大きな壁を感じませんでした。
そのため、Kotlin もすぐ扱えたのかなといった感じですかね

とはいえ、言語にプラスして、ライブラリやフレームワークの使い方が大事になってくるので、実際に開発するときはもっと勉強して慣れてからでないとだめですよね <-- あたりまえ、あたりまえ、あたりまえ体操

# 余談

今回の Kotlin を春休み企画(仮)第１弾にする予定でしたが、Kotlin を勉強していたら Scala との違いを調べてしまい、そのまま Scala に浮気してしまいました w
