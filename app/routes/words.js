const express = require("express");
const words = express.Router();
const db = require("../utility/DBUtil");

// 全てのつぶやきを取得する
words.get("/", (req, res) => {
  // クエリー実行
  db.exeQuery("SELECT * FROM words", "")
    .then((val) => res.status(val.httpStatus).send(val.json))
    .catch((err) =>
      res.status(err.httpStatus).send({ message: err.httpMessage })
    );
});

// つぶやきを取得する
words.get("/:id", (req, res) => {
  const id = req.params.id;

  // クエリー実行
  db.exeQuery("SELECT text, mind FROM words WHERE id = :id", { id })
    .then((val) => res.status(val.httpStatus).send(val.json))
    .catch((err) => {
      res.status(err.httpStatus).send({ message: err.httpMessage });
    });
});

// つぶやきを登録する
words.post("/", (req, res) => {
  const text = req.body.text;
  const mind = req.body.mind;

  // クエリー実行
  db.exeQuery("INSERT INTO words (text, mind) VALUES (:text, :mind)", {
    text,
    mind,
  })
    .then((val) =>
      res.status(val.httpStatus).send({ message: val.httpMessage })
    )
    .catch((err) => {
      res.status(err.httpStatus).send({ message: err.httpMessage });
    });
});

// つぶやきを編集する
words.put("/:id", (req, res) => {
  const id = req.params.id;

  (async () => {
    // つぶやきを取得
    const word = await db.exeQuery("SELECT * FROM words WHERE id = :i", {
      id,
    });
    const text = req.body.text ? req.body.text : word.text;
    const mind = req.body.mind ? req.body.mind : word.mind;

    // つぶやきを更新
    const val = await db.exeQuery(
      "UPDATE words SET text = :text, mind = :mind WHERE id = :id",
      {
        text,
        mind,
        id,
      }
    );

    res.status(val.httpStatus).send({ message: val.httpMessage });
    return;
  })().catch((err) => {
    res.status(err.httpStatus).json({ message: err.httpMessage });
  });
});

// つぶやきを削除する
words.delete("/:id", (req, res) => {
  const id = req.params.id;

  // クエリー実行
  db.exeQuery("DELETE FROM words WHERE id = :id", { id })
    .then((val) =>
      res.status(val.httpStatus).send({ message: val.httpMessage })
    )
    .catch((err) => {
      res.status(err.httpStatus).send({ message: err.httpMessage });
    });
});

module.exports = words;
