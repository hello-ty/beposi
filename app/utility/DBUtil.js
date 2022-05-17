const logger = require("./Logger");

require("dotenv").config();

class DBUtil {
  constructor() {
    this.mysql = require("mysql");
  }

  executeQuery(sql, values, done) {
    const connection = this.mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // データベースに接続
    connection.connect(async (err) => {
      console.log(values);
      if (err) {
        logger.error("DB connect error: " + err);
        await done(err, undefined);
        return;
      } else {
        // カスタムクエリー
        this.useCustomQuery(connection);

        // クエリー実行
        connection.query(sql, values, async (err, results) => {
          connection.end();
          if (err) {
            logger.error("error in SQL (" + sql + ") error = " + err);
            await done({ error: "DB select error" }, undefined);
          } else {
            await done(undefined, results);
          }
        });
      }
    });
  }

  useCustomQuery(dbc) {
    dbc.config.queryFormat = function (query, values) {
      if (!values) return query;
      return query.replace(
        /\:(\w+)/g,
        function (txt, key) {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        }.bind(this)
      );
    };
  }
}

const db = new DBUtil();

module.exports = db;
