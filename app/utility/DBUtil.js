const logger = require("./Logger");

require("dotenv").config();

class DBUtil {
  constructor() {
    this.mysql = require("mysql");
  }
  getConnection(procedure) {
    const connection = this.mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect((err) => {
      if (err) {
        logger.error("DB connect error: " + err);
        procedure(err, undefined);
      } else {
        this.useCustomQuery(connection);
        procedure(undefined, connection);
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
