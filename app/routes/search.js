const express = require("express");
const search = express.Router();
const sqlite3 = require("sqlite3");
const dbPath = "app/db/database.sqlite3";

// 言葉を検索
search.get("/", (req, res) => {
  // データベースに接続
  const db = new sqlite3.Database(dbPath);
  const keyword = req.query.q;

  db.all("SELECT * FROM words WHERE text=?", keyword, (err, row) => {
    if (!row || row["0"] == undefined || row == null) {
      res.status(404).send({ error: "Ooops!!" });
    } else {
      res.status(200).json(row);
    }
  });
  db.close();
});

module.exports = search;
