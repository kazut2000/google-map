# Google Map
- ペンギンハッカソン (2022/02/27~2022/02/27)  
- テーマ：「飯塚を楽しく」  
行動範囲が狭く、自炊ばかりで外食をあまりしない。美味しいお店を九工大生で共有できるサービスを作りたい！

## 使い方
```
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## 使用技術
- フロント
  - React
  - Google Map API
  - Material UI
- サーバー
  - hasura
- インフラ
  - Vercel

### フロント
- 初めてReactを触りました。
- Google Map APIを使用しました。
- サイドバーやMap上のボタンを表示するのにマテリアルUIを使用しました。

- 九工大生なら母校の緯度経度はご存じですよね。
```
// Mapの中心を九州工業大学に設定
const center = {
  lat: 33.6537, // 緯度
  lng: 130.6722, // 経度
};
```

### サーバー
- locationsテーブル

  | column | type | other |
  | - | - | - |
  | id | integer | Primary Key |
  | lat_location | text | - |
  | lng_location | text | - |
  | name | text | - |

- rsreviewテーブル

  | column | type | other |
  | - | - | - |
  | id | integer | Primary Key |
  | locations_id | integer | Foreign Keys |
  | comment | text | - |

### インフラ
初めてでも簡単にデプロイできるVercelにReactをデプロイしました。  
最初にCI/CDを構築したので、発表前にデプロイで焦ることがありませんでした。
<img width="960" alt="image" src="https://user-images.githubusercontent.com/121243826/221764288-d18c3526-3611-47da-afe1-8c5355fcb890.png">

