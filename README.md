# Google Map
- ペンギンハッカソン (2022/02/27~2022/02/27)  
- テーマ：「飯塚を楽しく」  
行動範囲が狭く、自炊ばかりで外食をあまりしない。美味しいお店を九工大生で共有できるサービスを作りたい！

## 使い方
- 環境変数
```
REACT_APP_ID_TOKEN=""
REACT_APP_GOOGLE_MAP_API_KEY=""
```

- サーバ起動
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
  
![スクリーンショット 2023-02-28 14 51 59](https://user-images.githubusercontent.com/89256544/221766034-6ce15ccb-35ac-4345-99a2-54a657acdf65.png)

### インフラ
初めてでも簡単にデプロイできるVercelにReactをデプロイしました。  
最初にCI/CDを構築したので、発表前にデプロイで焦ることがありませんでした。
<img width="960" alt="image" src="https://user-images.githubusercontent.com/121243826/221764288-d18c3526-3611-47da-afe1-8c5355fcb890.png">

## 躓いたところ
### 1つ目
【Issue】  
開発環境ではクリアなMAPが表示されるのに、本番環境で「for development purposes only」という透かし入りの、暗い地図または白黒反転のストリートビュー画像が表示した。   
【原因】  
本番環境にAPIキーの環境変数を設定していなかった。  
【解決方法】  
本番環境のサーバーにも環境変数の設定をした！  
![image](https://user-images.githubusercontent.com/121243826/221765456-8a6d45b4-cfd5-4cae-b395-de869b778490.png)  


### 2つ目
【問題】  
google map api のInfoWindow, Marker がコードがあってるはずなのに動かなかった  
【原因】  
reactの開発モードだと2回レンダリングされてしまうため  
【解決法】  
reactのstrictモードを停止した
