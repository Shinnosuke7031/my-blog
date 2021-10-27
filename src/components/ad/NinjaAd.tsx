import React, { useEffect } from 'react';

// 広告タイプの型
type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};
// PC/SP切替広告のReactコンポーネント
const AdmaxSwitch: React.FC<{
  id: string;
  type: string;
  classAdName: string;
  width?: number;
  height?: number;
}> = (props) => {
  useEffect(() => {
    //     <!-- admax -->
    // <div class="admax-ads" data-admax-id="551add5a0182aea0766e5b41a74841b3" style="display:inline-block;width:300px;height:250px;"></div>
    // <script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "551add5a0182aea0766e5b41a74841b3",type: "banner"});</script>
    // <script type="text/javascript" charset="utf-8" src="https://adm.shinobi.jp/st/t.js" async></script>
    // <!-- admax -->
    // windowオブジェクトの広告リストを初期化
    if (!window['admaxads']) window['admaxads'] = [];
    // 広告リストを取得
    const admaxads: AdmaxAdType[] = window['admaxads'];
    // 広告リストになかったら追加
    if (!admaxads.some((ad) => ad.admax_id === props.id))
      admaxads.push({
        admax_id: props.id,
        type: props.type,
      });
    // 外部JSを読み込んで広告リストを実際に表示
    const tag = document.createElement('script');
    tag.src = 'https://adm.shinobi.jp/st/t.js';
    tag.async = true;
    document.body.appendChild(tag);
    // アンマウント時にJSタグと広告情報を削除
    return () => {
      document.body.removeChild(tag);
      admaxads.splice(
        admaxads.findIndex((ad) => ad.admax_id === props.id),
        1,
      );
      window['__admax_tag__'] = undefined;
    };
  }, [props.id, props.type]);
  return (
    <div
      className={props.classAdName}
      data-admax-id={props.id}
      style={{ display: 'inline-block' }}
    />
  );
};

export default AdmaxSwitch;
