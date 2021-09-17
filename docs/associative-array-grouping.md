---
slug: associative-array-grouping
title: PHPの連想配列をグルーピングする方法
description: PHPの連想配列の各要素を、とあるkeyでグルーピングする方法をまとめました。
date: 2021/5/3
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnew-php-logo.png?alt=media&token=dff0076d-dce6-44a5-9107-248545e15d4e
type: tect
tag:
  - PHP
  - バックエンド
---

# 初めに

先日、案件対応の中で、連想配列を key の値でグルーピングすることがあったので、備忘録のためにもまとめました。

# 前置き

## 連想配列

**連想配列**とは、以下のような配列です。

```php:
$array = [
  ['name' => 'Laravel', 'language' => 'php'],
  ['name' => 'Django', 'language' => 'python'],
  ['name' => 'React', 'language' => 'javascript'],
  ['name' => 'CakePHP', 'language' => 'php'],
  ['name' => 'Lumen', 'language' => 'php'],
  ['name' => 'Kotlin', 'language' => 'java'],
  ['name' => 'Angular', 'language' => 'javascript'],
  ['name' => 'Scala', 'language' => 'java'],
  ['name' => 'Smarty', 'language' => 'php'],
  ['name' => 'Vue', 'language' => 'javascript'],
  ['name' => 'Flask', 'language' => 'python'],
];
```

今回は、この配列をプログラミング言語の key である`language`でグルーピングしていきます。

最終的には、以下のようにグルーピングします！

```php:
$grouped_array = [
  ['php'] => [
    ['name' => 'Laravel', 'language' => 'php'],
    ['name' => 'CakePHP', 'language' => 'php'],
    ['name' => 'Lumen', 'language' => 'php'],
    ['name' => 'Smarty', 'language' => 'php'],
  ],
  ['python'] => [
    ['name' => 'Django', 'language' => 'python'],
    ['name' => 'Flask', 'language' => 'python'],
  ],
  ['javascript'] => [
    ['name' => 'React', 'language' => 'javascript'],
    ['name' => 'Angular', 'language' => 'javascript'],
    ['name' => 'Vue', 'language' => 'javascript'],
  ],
  ['java'] => [
    ['name' => 'Kotlin', 'language' => 'java'],
    ['name' => 'Scala', 'language' => 'java'],
  ]
];
```

# グルーピング

## ステップ１

まずは、グルーピング後の配列を入れる変数を以下のように定義します。

```php:
$grouped_array = [];
```

## ステップ２

続いて、以下のようにグルーピング処理を記述します。

```php:
foreach ($array as $arr) {
  $key = $arr['language'];
  $grouped_array[$key][] = $arr;
}
```

非常にシンプルですよね。

解説すると、配列の各要素の`language`を、`$grouped_array`の key にして要素を代入しています。

すでに key が存在していれば末尾に追加され、存在していなければ新たに key が追加されます。

## ステップ 3

では、グルーピングの処理を関数にしましょう。

```php:
function grouping(array $array, string $focus_key): array {
  $g_array = [];
  foreach ($array as $arr) {
    $key = $arr[$focus_key];
    $g_array[$key][] = $arr;
  }
  return $g_array;
};

$grouped_array = grouping($array, 'language');
```

これで、グルーピング処理の関数ができました。

`var_dump($grouped_array)`で配列の中身を表示すると以下のようにグルーピングできているのが確認できます。

```none
array(4) {
  ["php"]=>
  array(4) {
    [0]=>
    array(2) {
      ["name"]=>
      string(7) "Laravel"
      ["language"]=>
      string(3) "php"
    }
    [1]=>
    array(2) {
      ["name"]=>
      string(7) "CakePHP"
      ["language"]=>
      string(3) "php"
    }
    [2]=>
    array(2) {
      ["name"]=>
      string(5) "Lumen"
      ["language"]=>
      string(3) "php"
    }
    [3]=>
    array(2) {
      ["name"]=>
      string(6) "Smarty"
      ["language"]=>
      string(3) "php"
    }
  }
  ["python"]=>
  array(2) {
    [0]=>
    array(2) {
      ["name"]=>
      string(6) "Django"
      ["language"]=>
      string(6) "python"
    }
    [1]=>
    array(2) {
      ["name"]=>
      string(5) "Flask"
      ["language"]=>
      string(6) "python"
    }
  }
  ["javascript"]=>
  array(3) {
    [0]=>
    array(2) {
      ["name"]=>
      string(5) "React"
      ["language"]=>
      string(10) "javascript"
    }
    [1]=>
    array(2) {
      ["name"]=>
      string(7) "Angular"
      ["language"]=>
      string(10) "javascript"
    }
    [2]=>
    array(2) {
      ["name"]=>
      string(3) "Vue"
      ["language"]=>
      string(10) "javascript"
    }
  }
  ["java"]=>
  array(2) {
    [0]=>
    array(2) {
      ["name"]=>
      string(6) "Kotlin"
      ["language"]=>
      string(4) "java"
    }
    [1]=>
    array(2) {
      ["name"]=>
      string(5) "Scala"
      ["language"]=>
      string(4) "java"
    }
  }
}
```

# まとめ

やってみると、意外とシンプルにできました。

外部 API から取得したデータをフロントエンドに渡すときに、グルーピングしてあるとその後の処理が簡潔になるので重要な処理だと思いました。
