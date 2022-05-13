const express = require("express");
const words = express.Router();
const sqlite3 = require("sqlite3");
const dbPath = "app/db/database.sqlite3";

const run = async (sql, values, db) => {
  return new Promise((resolve, reject) => {
    db.run(sql, values, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

// Get all words
words.get("/", (req, res) => {
  // Connect to database
  const db = new sqlite3.Database(dbPath);

  db.all("SELECT * FROM words", (err, rows) => {
    res.json(rows);
  });

  db.close();
});

// Get a word
words.get("/:id", (req, res) => {
  // Connect to database
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;

  db.get("SELECT * FROM words WHERE id = ?", id, (err, row) => {
    res.json(row);
  });

  db.close();
});

// Create words
words.post("/", async (req, res) => {
  if (!req.body.text || req.body.text === "") {
    res.status(404).send("ユーザー名が定義されてません。");
  } else {
    // Connect database
    const db = new sqlite3.Database(dbPath);

    const text = req.body.text;
    const mind = req.body.mind;

    try {
      await run(
        "INSERT INTO words (text, mind) VALUES (?, ?)",
        [text, mind],
        db
      );
      res.status(201).send({ message: "新規つぶやきを作成しました。" });
    } catch (e) {
      res.status(500).send({ error: e });
    }
    db.close();
  }
});

// Upadate word
words.put("/:id", (req, res) => {
  if (
    !req.body.text ||
    req.body.text === "" ||
    !req.body.mind ||
    req.body.mind === ""
  ) {
    res.status(400).send({ error: "項目を全て入力してください" });
  } else {
    // Connect database
    const db = new sqlite3.Database(dbPath);
    const id = req.params.id;

    db.get("SELECT * FROM words WHERE id=?", id, async (err, row) => {
      const text = req.body.text ? req.body.text : row.text;
      const mind = req.body.mind ? req.body.mind : row.mind;

      try {
        await run(
          "UPDATE words SET text=?, mind=? WHERE id = ?",
          [text, mind, id],
          db
        );
        res.status(200).send({ message: "つぶやきを更新しました。" });
      } catch (e) {
        res.status(500).send({ error: e });
      }
    });
    db.close();
  }
});

// Delete word
words.delete("/:id", async (req, res) => {
  // Connect database
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;

  db.get("SELECT * FROM words WHERE id=?", id, async (err, row) => {
    if (!row) {
      res.status(404).send({ error: "削除するつぶやきがありませんでした。" });
    } else {
      try {
        await run("DELETE FROM words WHERE id = ?", id, db);
        res.status(200).send({ message: "つぶやきを削除しました" });
      } catch (e) {
        res.status(500).send({ error: e });
      }
    }
    db.close();
  });
});

module.exports = words;
