const express = require("express");
const search = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 言葉を検索
search.get("/", (req, res) => {
  // データベースに接続
  const text = req.query.q;

  // クエリー実行
  db.exeQuery("SELECT * FROM words WHERE text = :text", { text })
    .then((val) => res.status(val.httpStatus).send(val.json))
    .catch((err) => {
      res.status(err.httpStatus).send({ message: err.httpMessage });
    });
});

module.exports = search;
