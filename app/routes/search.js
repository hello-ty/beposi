const express = require("express");
const search = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 言葉を検索
search.get("/", (req, res) => {
  // データベースに接続
  const text = req.query.q;
  const sql = "SELECT * FROM words WHERE text = :text";

  // クエリー実行
  (async () => {
    try {
      const response = await db.exeQuery(sql, { text });
      res.status(200).send(response);
    } catch (err) {
      res.status(404).send(err);
    }
  })();
});

module.exports = search;
