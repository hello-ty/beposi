const express = require("express");
const words = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 全てのつぶやきを取得する
words.get("/", (req, res) => {
  const sql = "SELECT * FROM words";
  db.executeQuery(sql, "", (error, results) => {
    res.json(results);
  });
});

// つぶやきを取得する
words.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM words WHERE id = :id";
  db.executeQuery(sql, { id }, (error, result) => {
    res.json(result[0]);
  });
});

// つぶやきを登録する
words.post("/", async (req, res) => {
  if (!req.body.text || req.body.text === "") {
    res.status(404).send("ユーザー名が定義されてません。");
  } else {
    const text = req.body.text;
    const mind = req.body.mind;

    const sql = "INSERT INTO words (text, mind) VALUES (:text, :mind)";
    db.executeQuery(sql, { text, mind }, (error) => {
      if (error) {
        res.status(500).send({ error: "作成に失敗しました!!" });
      } else {
        res.status(201).json({ message: "新規つぶやきを作成しました。" });
      }
    });
  }
});

// つぶやきを編集する
words.put("/:id", (req, res) => {
  // バリデーション
  if (
    !req.body.text ||
    req.body.text === "" ||
    !req.body.mind ||
    req.body.mind === ""
  ) {
    res.status(400).send({ error: "項目を全て入力してください" });
  } else {
    const id = req.params.id;

    const sqlSelect = "SELECT * FROM words WHERE id = :id";
    const sqlUpdate =
      "UPDATE words SET text = :text, mind = :mind WHERE id = :id";

    // つぶやきを取得
    db.executeQuery(sqlSelect, { id }, (error, result) => {
      const text = req.body.text ? req.body.text : result.text;
      const mind = req.body.mind ? req.body.mind : result.mind;
      // つぶやきを更新
      db.executeQuery(sqlUpdate, { text, mind, id }, (error) => {
        if (error) {
          res.status(500).send({ error: "更新に失敗しました!!" });
        } else {
          res.status(200).json({ message: "つぶやきを更新しました。" });
        }
      });
    });
  }
});

// つぶやきを削除する
words.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const sqlSelect = "SELECT * FROM words WHERE id = :id";
  const sqlDelete = "DELETE FROM words WHERE id = :id";

  // つぶやきを取得
  db.executeQuery(sqlSelect, { id }, (error, result) => {
    const text = req.body.text ? req.body.text : result.text;
    const mind = req.body.mind ? req.body.mind : result.mind;
    // つぶやきを削除
    db.executeQuery(sqlDelete, { id }, (error) => {
      if (error) {
        res.status(404).send({ error: "削除に失敗しました!!" });
      } else {
        res.status(200).json({ message: "つぶやきを削除しました" });
      }
    });
  });
});

module.exports = words;
