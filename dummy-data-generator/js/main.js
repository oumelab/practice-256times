// これまでのコードを貼り付けて制作を進めましょう
// 自由に記述してかまいません

'use strict';

{ 
  // 苗字データ
  const fstr = "佐藤 鈴木 高橋 田中 渡辺 伊藤 山本 中村 小林 加藤 吉田 山田 佐々木 山口 松本 井上 木村 斎藤 林 清水 山崎 阿部 森 池田 橋本 山下 石井 中島 前田 藤田 後藤 小川 岡田 長谷川 石川 藤井 西村 斉藤 辻 丸山 大塚 田村 平野 杉山 大西 菅原 野村 新井 杉本 中川 福田 白石 石原 森田 原田 久保 岩田 桜井 金子 三浦 和田 中田 竹内 石田 松井 小野 菊地 大野 小島 水野 吉川 山内 西田 北村 浜田 五十嵐 土屋 谷口 村田 大谷 武田 上田 安田 千葉 荒木 古川 松尾 川口 中山 横山 西川 内田 川上 志村 小山 田辺 石黒 大石 福井 平田 菊池 今井 大村 江口 井口";

  // 名前データ
  const lstr = "大輔 一郎 健太 裕太 太郎 康二 亮介 拓真 直人 大翔 光 春馬 隆二 智也 悠斗 隼人 裕也 純 雅也 将太 達也 陽一 駿 翔太 貴大 瑛斗 一樹 大和 誠 啓太 凌 健 春樹 慎之介 航 涼太 誠也 大雅 優太 諒 航太 大地 健一 大輝 大志 良太 海翔 翼 悠人 真 康平 昴 和也 彰人 勇輝 光希 誉 凛 真央 由佳 裕子 麻美 美咲 千晴 彩花 紗綾 理絵 彩 美緒 恵美 桃子 瑞希 沙羅 梨乃 未来 菜々子 花音 結衣 百花 友美 美帆 詩織 愛美 陽子 真理 華 美穂 芽衣 優奈 愛子 愛 夏美 恵 千尋 涼子 奈々 結菜 夏子 真紀 紗良 愛里 亜美 心美 結月 志乃 美月 陽菜 由紀 美桜";

  let num; // 生成するデータの数
  const NUM1 = 10; // デフォルトのデータ数1
  const NUM2 = 20; // デフォルトのデータ数2
  const NUM3 = 30; // デフォルトのデータ数3
  const MIN_NUM = 5; // 最小値
  const MAX_NUM = 100; // 最大データ数
  
  // 苗字・名前データをスペース区切りで配列にする
  const fnames = fstr.split(' '); // 苗字
  const lnames = lstr.split(' '); // 名前
  
  // 要素を取得
  const items = document.querySelectorAll('input'); // ラジオボタン, テキストボックス
  const btn = document.getElementById('btn'); // 生成ボタン
  const form = document.getElementById('form'); // フォーム

  // ラジオボタンの要素取得＆値をセット
  const items_radio = document.querySelectorAll('input[type="radio"]');
  items_radio.forEach((item, index) => {
    item.value = [NUM1, NUM2, NUM3][index];
    item.nextSibling.textContent = [NUM1, NUM2, NUM3][index];
  });

  // テキストボックスの要素取得＆値をセット
  const items_text = document.querySelector('input[type="number"]');
  items_text.min = MIN_NUM;
  items_text.max = MAX_NUM;
  items_text.placeholder = `${MIN_NUM}〜${MAX_NUM}`;

  const names = document.getElementById('names'); // 名前を表示する場所

  // 関数:: データを表示する
  function showData() {
    const titles = ['No', '名前', '購入金額', '構成比'];
    const title_dl = document.createElement('dl');
    names.appendChild(title_dl);
    title_dl.classList.add('title'); // CSSのクラス付与
    titles.forEach((title, index) => {
      let elm;
      if (index === 0) {
        elm = document.createElement('dt');
      } else {
        elm = document.createElement('dd');
      }
      elm.textContent = titles[index];
      title_dl.appendChild(elm);
    });
    
    // リストを生成して表示
    let list = []; // 1件の表示内容を入れる配列
    const lists = []; // 全体の表示内容を入れる配列
    let total = 0; // 全体の合計
    
    for (let i =0; i < num; i++) {
      
      // 乱数生成・表示内容を配列にする
      // 名前
      const fnum = Math.floor(Math.random() * fnames.length);
      const lnum = Math.floor(Math.random() * lnames.length);
      const name = `${fnames[fnum]} ${lnames[lnum]}`;
      // 金額
      const rate = Math.random();
      let max;
      let min;
      if (rate < 0.1) {
        // 10% 10万1,000円以上 30万円以下
        min = 101000;
        max = 300000;
      } else if (rate < 0.2){
        // 20% 3万1,000円以上 10万円以下
        min = 31000;
        max = 100000;
      } else {
        // 70% 0円以上 3万円以下
        min = 0;
        max = 30000;
      }
      const pay = Math.floor((Math.random() * (max - min) + min) / 1000);
      
      total += pay;
      list = [name, pay];
      lists.push(list); // 配列を入れ子にする
    }

    // 合計金額を表示
    const totalValue = `<div class="total"><small>合計金額 :</small><span>${(total * 1000).toLocaleString()}</span><span class="units">円</span></div>`;
    names.insertAdjacentHTML('beforebegin', totalValue);
     
    // 説明リストを生成表示
    lists.forEach((elm, index) => {
      // 一行追加
      const name_dl = document.createElement('dl');
      names.appendChild(name_dl);

      // 連番
      const serno = `<dt>${index + 1}</dt>`;
      name_dl.insertAdjacentHTML(`beforeend`, serno);

      // 名前
      const name_dd = `<dd><span>${lists[index][0]}</span></dd>`;
      name_dl.insertAdjacentHTML('beforeend', name_dd);

      // 購入金額
      const pay_dd = `<dd><span class="pay">${(lists[index][1] * 1000).toLocaleString()}<span class="units">円</span></span></dd>`;
      name_dl.insertAdjacentHTML('beforeend', pay_dd);

      // 割合
      let pertotal = 0;
      if (lists[index][1] > 0) {
        pertotal = Number(lists[index][1] / total * 100).toFixed(2);
      }
      const pertotal_dd = `<dd><span class="pertotal">${pertotal}<span class="units">%</span></span></dd>`;
      name_dl.insertAdjacentHTML('beforeend', pertotal_dd);
    });
  }

  // 関数 :: 生成するデータ数を取得
  function getNum() {
    num = ''; // 初期化
    items.forEach((item, index) => {
      if (index === 3) {
        if (item.value !== '') {
          for (let i =0; i > 3; i++) {
            items[i].checked = false;
            items[i].nextSibling.classList.remove('checked');
          }
          num = item.value;
          console.log(num);
        }
      } else {
      item.nextSibling.classList.remove('checked');
      if (item.checked == true) {
          num = item.value;
          item.nextSibling.classList.add('checked');
        }
      }
    });
  }
  
  // 関数:: データ表示をクリア
  function clearData() {
    if (names.previousSibling) {
      names.previousSibling.remove();
    }
    while (names.firstChild) {
      names.removeChild(names.firstChild);
    }
  }

  // ラジオボタンチェック時の処理(fieldsetのイベントで対応)
  // document.querySelector('fieldset').addEventListener('click', (e) => {
  //   // if (e.target.type === 'radio') {
  //     if (items[3].value !== '') {
  //     for (let i =0; i >3; i++) {
  //       items[i].checked = false;
  //       items[i].disabled = true;
  //       items[i].nextSibling.classList.remove('checked');
  //     }
  //     }
  //     // }
  //   getNum();
  // });

  // ラジオボタンorテキストボックスチェック時の条件分岐処理
    document.querySelectorAll('input').forEach((elm, index) => elm.addEventListener('click', (e) => {
      if (e.target.type === 'radio') {
        items[3].value = '';
        items[3].style.outline = '';
      for (let i =0; i >3; i++) {
        items[i].checked = false;
        items[i].disabled = true;
        items[i].nextSibling.classList.remove('checked');
      }
      items[index].checked = true;
      items[index].classList.add('checked');
      getNum();
    } else if (e.target.type === 'number') {
      items[3].style.outline = '#666 solid 2px';
      items[0].checked = false;
      items[1].checked = false;
      items[2].checked = false;
      for (let j = 0; j >3; j++) {
        items[j].checked = false;
        items[j].disabled = true;
        items[j].classList.remove('checked');
      }
      items[3].addEventListener('change', () => {
      getNum();
      });
    }
    }));

    // テキストボックス入力時の処理
    document.querySelector('input[type="number"]').addEventListener('input', () => {
      items[3].style.outline = '#666 solid 2px';
      items[0].checked = false;
      items[1].checked = false;
      items[2].checked = false;
      for (let j = 0; j >3; j++) {
        items[j].checked = false;
        items[j].disabled = true;
        items[j].classList.remove('checked');
      }
      items[3].addEventListener('change', () => {
      getNum();
      });
    });
  
  // 生成ボタンクリック時の処理
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    // 生成データ数取得
    getNum();

    if (num === '' || num === undefined) {
      alert('生成データ数の設定が無効です。');
      return;
    } else if (num < MIN_NUM || num > MAX_NUM) {
      alert('5〜100の生成データ数を設定してください。');
      return;
    }
    // 表示中のデータをクリア
    clearData(); 
    // データを表示
    showData();
      
  });

  // 初回データ生成
  document.querySelectorAll('input[type="radio"]')[0].checked = true;
  document.querySelectorAll('input[type="radio"]')[0].nextSibling.classList.add('checked');
  num = NUM1;
  showData();
  
}