---
slug: lumen-nginx-mysql
title: Lumen(Laravel)+Nginx+MySQLで簡単なAPIを作成してみた
description: 掲示板APIを、Lumen(Laravel)+Nginx+MySQLで作成したので、それぞれの重要なポイントやDocker-composeの設定などをまとめました。万能で機能がたくさんあるLaravelとは違い、軽量版であるLumenはハマりポイントがいくつもあって大変でした。
date: 2021/3/1
type: tech
tag: 
- Lumen
- Nginx
- MySQL
---

# はじめに

最近、フロントエンドにReact、サーバーサイドにLumenを使って簡単な掲示板を開発しました。
ちなみに、Docker上で実行しています。

万能で機能がたくさんあるLaravelとは違い、軽量版であるLumenはハマりポイントがいくつもあって大変でした。
しかも、Laravelに比べると情報が非常に少ない。。。

中々大変だったので、この記事にまとめてみました!

# Lumen, Nginx, MySQL導入
Docker-composeが使える前提で書いているのでご注意ください

## ディレクトリ構成

まず最初に、ディレクトリ構成を見ていきましょう！

```none
├── Docker
│   ├── mysql
│   │   ├── Dockerfile
│   │   ├── conf.d
│   │   │   └── my.conf
│   │   ├── initdb.d
│   │   └── mysql_data
│   ├── nginx
│   │   ├── Dockerfile
│   │   └── conf
│   │       └── default.conf
│   └── php
│       ├── Dockerfile
│       └── php.ini
├── docker-compose.yml
└── var
    └── www
        └── backend
```

こんな感じにしました。

## Docker-compose.ymlの編集

Docker-compose.ymlは↓↓↓
```yml:Docker-compose.yml
version: '3'

services:
  backend:
    container_name: php
    build: ./Docker/php
    volumes:
      - ./var/www/backend:/var/www/backend
    working_dir: /var/www/backend
    links:
      - mysql
    environment:
      DB_PORT: 3306
      DB_HOST: mysql
      DB_DATABASE: test
      DB_USERNAME: root
      DB_PASSWORD: root
      
  nginx:
    build: ./Docker/nginx
    container_name: web
    volumes:
      - ./Docker/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf
      - ./var/www/backend/public:/var/www/backend/public
    ports:
      - 8080:80
    links:
      - backend
      
  mysql:
    build: ./Docker/mysql
    container_name: db
    environment:
      MYSQL_DATABASE: coco
      MYSQL_USER: root
      MYSQL_PASSWORD: root
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - ./Docker/mysql/initdb.d:/docker-entrypoint-initdb.d
      - ./Docker/mysql/conf.d:/etc/mysql/conf.d
      - ./Docker/mysql/mysql_data:/var/lib/mysql
    ports:
      - 13300:3306
```

## Dockerfileの設定
各Dockerfileは以下のように書きました。

```Dockerfile:/Docker/nginx/Dockerfile
FROM  nginx:latest
```
```Dockerfile:/Docker/mysql/Dockerfile
FROM mysql:8.0.16
```
Lumenのインストールもあるため、PHPのDockerfileは少々複雑です。
特に、ハッシュ値には注意が必要です。
```Dockerfile:/Docker/php/Dockerfile
FROM php:7.3-fpm
COPY php.ini /usr/local/etc/php/

RUN apt-get update \
  && apt-get install -y zlib1g-dev libzip-dev mariadb-client \
  && docker-php-ext-install zip pdo_mysql

#Composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
#ハッシュ値は更新されるのでhttps://getcomposer.org/download/で確認してください
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER 1

ENV COMPOSER_HOME /composer

ENV PATH $PATH:/composer/vendor/bin
```
ついでに、php.iniも。
```ini:/Docker/php/php.ini
[Date]
date.timezone = "Asia/Tokyo"
[mbstring]
mbstring.internal_encoding = "UTF-8"
mbstring.language = "Japanese"

display_errors = On
```

# Nginxの設定
図のように、フロントエンドからリクエストがあった際に、NginxからLumenに流れていくように設定していきます。
![](https://storage.googleapis.com/zenn-user-upload/t69gi8a4ml6wuv9wsd165az1byn3)

```conf:Docker/nginx/conf/default.conf
server {
  listen       80;
  server_name  localhost;
  charset      utf-8;

  root /var/www/backend/public;

  index index.php;

  location / {
    try_files $uri $uri/ /index.php$is_args$args;
  }

  location ~ \.php$ {
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass  backend:9000;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include       fastcgi_params;
  }
}
```
これでNginxとLumenを繋げることができました！

# MySQLの設定
必ずコンテナを立ち上げる前にこの設定をしてください！

```conf:Docker/mysql/conf.d/my.conf
[mysqld]
default_authentication_plugin= mysql_native_password
explicit-defaults-for-timestamp=1
general-log-file=/var/log/mysql/mysqld.log
```
LumenとMySQLのv8は相性が悪いみたいで、この設定をしないとLumenとMySQLを接続できません。
詳しくは、[こちらの記事](https://qiita.com/ucan-lab/items/3ae911b7e13287a5b917)を参照。

ここで、コンテナを立ち上げます。
```none
$ docker-compose up -d
```
そして、MySQLのコンテナに入りましょう。
```none
$ docker-compose exec mysql
```
MySQL起動
```none
$ mysql -u root -p
```
`docker-compose.yml`で設定したパスワードを入力してMySQLを触れるようになります。
続いて、DBの作成
```none
mysql> CREATE DATABASE test;
```
`$ exit`を2回打ってMySQLとコンテナから出ましょう。

# Lumenの設定
## 最初に
`/backend/bootstrap/app.php`の
```php:
// $app->withFacades();
// $app->withEloquent();
```
のコメントアウトを外しておいてください。

## Migration
まずは、以下のコマンドでLumenのコンテナに入っていきます。
```none
docker-compose exec backend bash
```
続いて、
```none
$ php artisan make:migration create_articles_table --create=articles
```
とすると、`/backend/database/migrations/タイムスタンプ_create_articles_table.php`が生成されます。
この`タイムスタンプ_create_articles_table.php`を以下のように編集します。

```php:タイムスタンプ_create_articles_table.php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->increments('id');
　　　　　　 ////////// ↓↓↓追加↓↓↓ ///////////
            $table->string('name');
            $table->text('comment');
　　　　　　 ////////////////////////////////
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tests');
    }
}
```
編集後、以下のコマンドを実行。
```none
$ php artisan migrate
```
ここで、`$ exit`のコマンドで一回コンテナから出ます。
その後、MySQLのコンテナに入ってデータベースがあるか確認してみてください。
そして、適当にデータをINSERTしておきましょう。
```none
mysql> INSERT INTO tests (name, comment, created_at, updated_at) VALUE 
	('testman1', 'HELLO!', NOW(), NOW()),('testman2', 'HELLO!', NOW(), NOW()),
```
その後、ログアウトして、コンテナから出てください。

## Modelの作成
`backend/app/`に新しく`Tests.php`を作成してください。
```php:Tests.php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tests extends Model
{
  protected $table = 'tests'; 
  protected $fillable = ['name', 'comment'];
}
```

## Routeの設定
`backend/routes/web.php`でルーティングを設定できます。
ここに以下のルートを追加してください。
```php:web.php
$router->group(['prefix' => 'api/v1'], function() use ($router)
{
  $router->get('tests', 'TestsController@tests');
}
```

## Controllerの作成
`backend/app/Http/Controllers`に新しく`TestsController.php`を作成して、以下のように編集してください。

```php:TestsController.php
<?php
namespace App\Http\Controllers;
use App\Tests;

class TestsController extends Controller
{
  public function tests() {
    return response()->json(Tests::all());
  }
}
```

以上でAPIの基礎的な設定が終わりです！

## APIの確認
`http://localhost:8080/api/v1/tests`に行くと、DBの内容が表示されていると思います。

