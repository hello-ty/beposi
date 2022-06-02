import logger from "./Logger";

require("dotenv").config();

class DBUtil {
  private mysql;

  constructor() {
    this.mysql = require("mysql2");
  }

  exeQuery(sql: any, values: any) {
    return new Promise((resolve, reject) => {
      const connection = this.mysql.createConnection(process.env.DATABASE_URL);
      // データベースに接続
      connection.connect((err: any) => {
        if (err) {
          logger.error("DB connect error: " + err);
          reject({
            httpStatus: 500,
            httpMessage: "サーバーで問題が発生しました。",
          });
        } else {
          // カスタムクエリー
          this.useCustomQuery(connection);

          // クエリー実行
          connection.query(sql, values, (err: any, results: any) => {
            connection.end();

            if (err) {
              logger.error("error in SQL (" + sql + ") error = " + err);
              reject({
                httpStatus: 404,
                httpMessage: "処理に失敗しました。",
              });
            } else {
              let status = 200;
              let message = "";

              // クエリーがINSERTだった場合
              if (!sql.indexOf("INSERT")) {
                message = "作成が成功しました";
                status = 201;
              } else if (!sql.indexOf("UPDATE")) {
                message = "編集が成功しました";
              } else if (!sql.indexOf("DELETE")) {
                message = "削除が成功しました";
              } else if (!sql.indexOf("SELECT")) {
                message = "取得が成功しました";
              }

              resolve({
                httpStatus: status,
                json: results,
                httpMessage: message,
              });
            }
          });
        }
      });
    });
  }

  useCustomQuery(dbc: any) {
    dbc.config.queryFormat = function (query: any, values: any) {
      if (!values) return query;
      return query.replace(
        /\:(\w+)/g,
        ((txt: any, key: any) => {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        }).bind(this)
      );
    };
  }
}

const db = new DBUtil();

export default db;