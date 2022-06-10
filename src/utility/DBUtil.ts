import logger from "./Logger";

require("dotenv").config();

class DBUtil {
  private mysql;

  constructor() {
    this.mysql = require("mysql2");
  }

  exeQuery(sql: string, values: object | "") {
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
                httpStatus: 500,
                httpMessage: "サーバーでエラーが発生しました。",
              });
            } else {
              resolve({ json: results });
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
