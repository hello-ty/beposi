const express = require("express");
const search = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 言葉を検索
search.get("/", (req, res) => {
  // データベースに接続
  const keyword = req.query.q;
  getKeyWord(keyword, (error, word) => {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).json(word);
    }
  });
});

function getKeyWord(keyword, done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "SELECT * FROM words WHERE text = :text";
    dbc.query(sql, { text: keyword }, (error, results) => {
      dbc.end();
      if (error) {
        logger.error("error in SQL (" + sql + ") error = " + error);
        done({ error: "DB select error" }, undefined);
      } else {
        done(undefined, results);
      }
    });
  });
}

module.exports = search;
