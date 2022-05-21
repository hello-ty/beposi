const express = require("express");
const words = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 全てのつぶやきを取得する
words.get("/", (req, res) => {
  const sql = "SELECT * FROM words";

  getQueryResult(res, sql, "", 200, 404);
});

// つぶやきを取得する
words.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM words WHERE id = :id";

  getQueryResult(res, sql, { id }, 200, 404);
});

// つぶやきを登録する
words.post("/", (req, res) => {
  if (!req.body.text || req.body.text === "") {
    res.status(404).send("ユーザー名が定義されてません。");
  } else {
    const text = req.body.text;
    const mind = req.body.mind;

    const sql = "INSERT INTO words (text, mind) VALUES (:text, :mind)";

    getQueryResult(res, sql, { text, mind }, 201, 500);
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

    // クエリー実行
    (async () => {
      try {
        // つぶやきを取得
        const getSelect = await db.exeQuery(sqlSelect, { id });
        const text = req.body.text ? req.body.text : getSelect.text;
        const mind = req.body.mind ? req.body.mind : getSelect.mind;

        // つぶやきを更新
        await db.exeQuery(sqlUpdate, { text, mind, id });
        res.status(200).json({ message: "つぶやきを更新しました。" });
      } catch (err) {
        res.status(500).send({ error: "更新に失敗しました!!" });
      }
    })();
  }
});

// つぶやきを削除する
words.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM words WHERE id = :id";

  getQueryResult(res, sql, { id }, 200, 404);
});

// クエリーの結果を取得する
async function getQueryResult(res, sql, values, successCode, errCode) {
  try {
    const response = await db.exeQuery(sql, values);
    res.status(successCode).send(response);
  } catch (err) {
    res.status(errCode).send(err);
  }
}

module.exports = words;
