---
slug: laravel-api
title: Laravelで(CORS対策付き)APIを簡単に作る方法
description: 現在のWEB開発では、フロントエンドとバックエンドを分離した考え方が主流になってきています。そのほうが、それぞれのロジックが混在せずに効率よく開発ができるからです。フロントエンドはAPIから情報を取得して、表示処理はJavaScript(React, Vueなど)で行います。PHPのフレームワークとして代表的なLaravelでは、APIを簡単に作成できます。今回は、その方法をまとめました。
date: 2021/3/16
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Flaravel-1.png?alt=media&token=c8d8aff8-88f0-41f6-a055-af4d464492f1
type: tect
tag:
  - Next.js
  - React
  - SSG
---

# はじめに

昨今の WEB 開発では、フロントエンドとバックエンドを分離した考え方が主流になってきています。

そのほうが、それぞれのロジックが混在せずに効率よく開発ができるからです。

PHP の最強フレームワークである Laravel は API を簡単に作ることができます。

また、API を作る上で誰もがハマるのが CORS(**C**ross-**O**rigin **R**esource **S**haring)です。詳しくは[こちら](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)。

今回は、Laravel で API 作成 + CORS 対策の仕方をまとめました。

# 前提

Laravel のインストールはできている前提で進めていきます。バージョンはこんな感じです。

```none
Laravel Framework 6.20.18
```

# API 作成

## Controller の作成

`/app/Http/Controllers/TestController.php`を作成し、Controller での処理を書きます。

`/app/Model/Test.php`には、DB に接続するための記述がしてあります(詳細は割愛)。

```php:Controller.php
<?php

namespace App\Http\Controllers;
use App\Models\Test;

class TestController extends Controller
{
  public function all() {
    $res = Test::all();
    return response()->json($res, 200);
  }
}
```

## route の設定

`/routes/api.php`を編集します。

```php:api.php
Route::get('test', 'TestController@all');
```

これだけで、API を叩くと Test の情報が取得できるようになります。

loclahost:8080 で laravel を起動している場合、この API は、

```none
http://localhost:8080/api/test
```

と叩くと取得できます。

# 問題点

フロントエンドが`loclahost:3000`で起動しているとします。

この場合、フロントエンドでは非同期通信で`loclahost:8080`から情報を取得することになります。

しかし、Origin が`loclahost:3000`と`loclahost:8080`で異なるため、CORS エラーで情報を取得できません。

そのため、CORS の設定をする必要があります。

# CORS の設定

## Middleware の作成

`/app/Http/Middleware/CorsMiddleware.php`を作成し、CORS の設定を書いていきます。

```php:CorsMiddleware.php
<?php
namespace App\Http\Middleware;
use Closure;
class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Credentials'=> 'true',
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Accept, Origin, Content-Type, Authorization, X-Requested-With'
        ];

        if ($request->isMethod('OPTIONS'))
        {
            return response()->json('{"method":"OPTIONS"}', 200, $headers);
        }

        $response = $next($request);
        foreach($headers as $key => $value)
        {
            $response->header($key, $value);
        }
        return $response;
    }
}
```

特に重要なのが、

```php:
'Access-Control-Allow-Origin' => '*',
```

の部分で、ワイルドカードを指定することで全てのオリジンを許可します。

もちろん、`loclahost:3000`だけを許可する際は、

```php:
'Access-Control-Allow-Origin' => 'http://localhost:3000',
```

とすれば OK です。

## Kernel に追加

`/app/Http/Kernel.php`に先ほど作成した Middleware を追加します。

```php:Kernel.php
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'cors' => \App\Http\Middleware\CorsMiddleware::class, // ここを追加!!!!
    ];
```

## route を編集

`/routes/api.php`をまた編集します。

```php:api.php
Route::group(
  ['middleware' => ['cors']],
  function () {
    Route::get('test', 'TestController@all');
  }
);
```

これで、CORS 関連のヘッダーが追加されてレスポンスされるので、フロントエンドから API を叩いて情報を取得できます。

Laravel は本当に使いやすいなー
