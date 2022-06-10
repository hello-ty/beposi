import { Router } from "express";
import wordsController from "../controllers/wordsController";

const words: Router = Router();

words.get("/", wordsController.index); // つぶやき一覧を取得
words.post("/", wordsController.create); // つぶやきを新規作成
words.get("/:id", wordsController.get); // つぶやきを取得
words.put("/:id", wordsController.update); // つぶやきを更新
words.delete("/:id", wordsController.delete); // つぶやきを削除

export default words;
