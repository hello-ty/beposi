const express = require("express");
const words = express.Router();
const db = require("../utility/DBUtil");
const logger = require("../utility/Logger");

// 全てのつぶやきを取得する
words.get("/", (req, res) => {
  getAllWord((error, words) => {
    res.json(words);
  });
});

// つぶやきを取得する
words.get("/:id", (req, res) => {
  const id = req.params.id;

  getOneWord(id, (err, word) => {
    res.json(word[0]);
  });
});

// つぶやきを登録する
words.post("/", async (req, res) => {
  if (!req.body.text || req.body.text === "") {
    res.status(404).send("ユーザー名が定義されてません。");
  } else {
    const text = req.body.text;
    const mind = req.body.mind;

    registerWord(text, mind, (error) => {
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
  if (
    !req.body.text ||
    req.body.text === "" ||
    !req.body.mind ||
    req.body.mind === ""
  ) {
    res.status(400).send({ error: "項目を全て入力してください" });
  } else {
    const id = req.params.id;

    getOneWord(id, (err, word) => {
      const text = req.body.text ? req.body.text : word.text;
      const mind = req.body.mind ? req.body.mind : word.mind;

      updateWord(text, mind, id, (error) => {
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

  getOneWord(id, (err, word) => {
    if (err) {
      res.status(404).send({ error: "削除するつぶやきがありませんでした。" });
    } else {
      deleteWord(id, (error) => {
        if (error) {
          res.status(404).send({ error: "削除に失敗しました!!" });
        } else {
          res.status(200).json({ message: "つぶやきを削除しました" });
        }
      });
    }
  });
});

// 全てのつぶやきを取得
function getAllWord(done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "SELECT * FROM words";
    dbc.query(sql, (error, results) => {
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

// つぶやきを取得
function getOneWord(id, done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "SELECT * FROM words WHERE id = :id";
    dbc.query(sql, { id }, (error, results) => {
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

// つぶやきを作成
function registerWord(text, mind, done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "INSERT INTO words (text, mind) VALUES (:text, :mind)";
    dbc.query(sql, { text, mind }, (error) => {
      dbc.end();
      if (error) {
        logger.error("error in SQL (" + sql + ") error = " + error);
        done({ error: "DB register error" });
      } else {
        done(undefined);
      }
    });
  });
}

// つぶやきを編集
function updateWord(text, mind, id, done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "UPDATE words SET text = :text, mind = :mind WHERE id = :id";
    dbc.query(sql, { text, mind, id }, (error) => {
      dbc.end();
      if (error) {
        logger.error("error in SQL (" + sql + ") error = " + error);
        done({ error: "DB update error" });
      } else {
        done(undefined);
      }
    });
  });
}

// つぶやきを削除
function deleteWord(id, done) {
  db.getConnection((error, dbc) => {
    if (error) {
      logger.error("DB connect error:" + error);
      done({ error: "DB connect error" }, undefined);
      return;
    }
    const sql = "DELETE FROM words WHERE id = :id";
    dbc.query(sql, { id }, (error) => {
      dbc.end();
      if (error) {
        logger.error("error in SQL (" + sql + ") error = " + error);
        done({ error: "DB delete error" });
      } else {
        done(undefined);
      }
    });
  });
}

module.exports = words;
