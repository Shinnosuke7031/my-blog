---
slug: react-study
title: React初心者に進める勉強方法
description: Reactに触れてから約10ヶ月になりますが、最初の勉強の仕方がわからずに苦労しました。これからReactを勉強しようとしている方向けに、勉強の仕方をまとめましたので、参考にして頂ければ幸いです。
date: 2021/5/4
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.svg?alt=media&token=deb078bd-642f-4f12-b2b1-12bc29572368
type: tect
tag: 
- React
- フロントエンド
- 学習
---

# 初めに
私はReactに触れてから約10ヶ月になりますが、最初の勉強の仕方がわからずに苦労しました。

これからReactを勉強しようとしている方向けに、勉強の仕方をまとめましたので、参考にして頂ければ幸いです。

# JavaScriptの基礎
いきなりReactを触るの非常に危険です。

なぜなら、Reactの公式チュートリアルやドキュメントでは、JavaScriptの基礎はできているものとして書かれています。

Reactの基礎や便利なHooksは、JavaScriptの基礎がわからないと活用できないので、勉強必須です。

[Udemy](https://px.a8.net/svt/ejp?a8mat=3HA5YE+1FSQEQ+3L4M+6RHFL)などの学習コンテンツでHTML/CSSと同時にパパッと学べるので、試してみてください
！

# React公式チュートリアル
## チュートリアル
JavaScriptの基礎が分かったら、[Reactの公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)をやることをおすすめします。

このチュートリアルでは、**三目並べ**をReactで作っていきます。

主に、以下の基礎的な部分を手を動かしながら学べます。
- コンポーネント
- propsによるデータの渡し方
- イミュータブル(不変性)なコードの書き方

実際に形にしていきながら学べるので、進めていくうちに達成感もあります。

## 関数型コンポーネント
[Reactの公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)はReactの基礎的なことを学べたと思いますが、クラスでコンポーネント(Class Component)が書かれていたと思います。

しかし、現在主流なのは、関数で書かれた**関数コンポーネント(FC: Functional Component)**です。

FCは、クラスコンポーネントよりも簡潔なコードになります。

以下のClass ComponentとFunctional Componentを見比べてみてください。

```javascript:Class Component
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count+1})}>Click</button>
      </div>
    );
  }
}
```
```javascript:Functional Component
function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```
非常にシンプルだと思います。ちなみに、`useState`を**Hooks**と言います。

そこで、関数コンポーネントやHooksをマスターするために、[Reactの公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)で作成した三目並べを関数コンポーネントやHooksでリファクタリングしてみることをオススメします。

Reactの公式サイトには、関数コンポーネントやHooksについても説明があるので、それをみながらやってみてください！

これだけじゃ不安な人は、[Udemy](https://px.a8.net/svt/ejp?a8mat=3HA5YE+1FSQEQ+3L4M+6RHFL)にReactの講座もあるのでやってみるといいかもしれません！！

# 応用（その先へ...）
## Context APIとRedux
Reactはコンポーネント間でstate(状態)をprops経由でやりとりしていますが、コンポーネントが増えていくにつれてpropsの受け渡しが複雑になっていきます。

stateの管理をしやすくするために**Context API**と呼ばれるHooksや、**Redux**というライブラリがあります。

基本的には、Context APIは小中規模、Reduxは大規模なプロジェクトで使用されます。

これらを使えるようにすることで、開発しやすくなるので、学んで損はありません。

## TypeScript
TypeScriptとは、静的型付けしたJavaScriptです。

```javascript:
// JavaScript
let value = 0;
value = "0";// OK
// TypeScript
let value: number = 0;
value = "0";// エラー
```
大雑把ですが、こんな感じで、通常のJavaScriptの変数にはどんな値も代入できましたが、TypeScriptは`number`と指定したら数値しか代入できなくなります。

これは、VScodeのようなエディタと相性抜群で、コードを書いている段階でエラーの場所が分かったり、候補の補完がより高度なものになります。

開発効率が急速に上がるので、フロントエンド開発では必須とも言えますので、絶対にマスターしましょう！

## Next.js
このブログの開発にも使っているReactのフレームワークである**Next.js**は以下のようなメリットがあります。

- SSG(静的サイト生成)とSSR(サーバーサイドレンダリング)が簡単に扱える
- ルーティングの設定が簡潔になる
- SEO向上など

詳細は[こちらの記事](https://nosuke-blog.site/blog/make-next-blog)で触れているので、そちらをみてください。

近年、Next.jsの盛り上がりがすごく、非常に扱いやすいReactフレームワークなので、ぜひ試してみてください。

# まとめ
最初は大変かもしれませんが、根気強く楽しみながら学習してみてください！

私は、[Udemy](https://px.a8.net/svt/ejp?a8mat=3HA5YE+1FSQEQ+3L4M+6RHFL)や[Progate](https://prog-8.com/)で最初は勉強しまくりました。

コンテンツは充実しているので、どんどん活用していきましょう。
