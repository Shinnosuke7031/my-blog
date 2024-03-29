import { Paper } from '@material-ui/core';
import React, { FC } from 'react';
import MyLayout from '../components/MyLayout';
import Head from 'next/head';

const Policy: FC = () => (
  <MyLayout>
    <Head>
      <title>プライバシーポリシー</title>
      <meta name="description" content="プライバシーポリシー" />
    </Head>
    <Paper elevation={10}>
      <p>制定日2021/03/06</p>
      <h1>プライバシーポリシー</h1>
      <h2>広告の配信について</h2>
      <p>
        当サイトでは、第三者配信の広告サービス「Google Adsense
        グーグルアドセンス」を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報
        『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません)
        を使用することがあります。Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は
        <a href="https://policies.google.com/technologies/ads?hl=ja">
          「広告 – ポリシーと規約 – Google」
        </a>
        をご覧ください。
      </p>
      <br />
      <h2>アクセス解析ツールについて</h2>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
        このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
        <a href="https://www.google.com/policies/privacy/partners/">こちら</a>
        をクリックしてください。
      </p>
      <br />
      <h2>著作権について</h2>
      <p>
        当サイトの記事について、著作権は放棄しておりません。当サイトに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。引用の範囲を超えるものについては、法的処置を行います。転載を希望される方は、「お問い合わせ」よりご連絡をお願いします。
      </p>
      <p>
        当サイトは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。著作権や肖像権に関して問題がありましたら御連絡下さい。著作権所有者様からの警告及び修正・撤去のご連絡があった場合は迅速に対処または削除致します。
      </p>
      <br />
      <h2>免責事項</h2>
      <p>
        当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、必ずしもそれらの正確性や安全性等を保証するものではありません。誤情報が入り込んだり、情報が古くなっていることもございます。万が一、当サイトをご利用することで発生したトラブルに関しては一切の責任を負いかねます。あらかじめご了承くださいますようお願いいたします。また、本免責事項、および当サイトに掲載しているすべての記事は、予告なしに変更・削除されることがあります。
        予めご了承下さい。
      </p>
    </Paper>
  </MyLayout>
);

export default Policy;
