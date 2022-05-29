import { Router } from "express";
import db from "../utility/DBUtil";
const search: Router = Router();

// 言葉を検索
search.get("/", (req: any, res: any) => {
  // データベースに接続
  const text = req.query.q;

  // クエリー実行
  db.exeQuery("SELECT * FROM words WHERE text = :text", { text })
    .then((val: any) => res.status(val.httpStatus).send(val.json))
    .catch((err: any) => {
      res.status(err.httpStatus).send({ message: err.httpMessage });
    });
});

export default search;
