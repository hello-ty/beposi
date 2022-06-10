# beposi

## システム化の背景

## システム化の目的

## システム化の業務フロー

```mermaid
sequenceDiagram
    actor A as Admin
    actor U as User
    participant N as Nodejs
    participant D as DB
    Note over U,D: ユーザー画面
    U ->> N: 文字を入力
    activate N
    N ->> D: 文字から気分を検索
    activate D
    D -->> N: 気分を取得
    deactivate D
    alt 気分 is ポジティブ
      N -->> U: "ポジティブ"と表示
    else 気分 is ネガティブ
      N -->> U: "ネガティブ"と表示
    end
    opt Extra response
      N -->> U: "Ooops!!"と表示
    end
    deactivate N

    Note over A,D: 管理者画面
    A ->> N: 文字を入力
    activate N
    N ->> D: 文字を検索
    activate D
    D -->> N: 結果を取得
    deactivate D
    alt 結果 has 文字
      N -->> A: 文字を表示
    end
    deactivate N

    A ->> N: 文字 or 気分を送信
    activate N
    alt 新規作成
    activate D
    N ->> D: 文字 and 気分を送信
    else 編集
    N ->> D: 文字 or 気分を送信
    else 削除
    N ->> D: 文字を送信
    end
    alt success
    D -->> N:ステータス201を返す
    else failed
    D -->> N:適当なステータスを返す
    end
    deactivate D
    deactivate N
```

## About

- つぶやいて気分を判定するだけのシンプルな仕様
- API 理解のために作成した Web アプリ
- "8BJP6HdVTGgeSd"とつぶやくと管理画面に遷移する

## Pre-requests

- Language: Node.js
- Database: MySQL

## How to Local start

```
git clone https://github.com/hello-ty/beposi.git
cd beposi
vi .env
npm install
npm run compile
npm run start
```

## Server Environment Settings (.env file)

```
# MySQLへの接続情報を設定する
DATABASE_URL="database_url_of_planetscale"

# ログファイルを設定する
LOG_DIR='path_of_log_directory'
```

## Database Specification

```
# つぶやきを管理するマスターテーブル
CREATE TABLE beposi.words (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(128) NOT NULL,
  mind INT NOT NULL,
  PRIMARY KEY (id)
);
```
