import { Router } from "express";
import searchController from "../controllers/searchController";

const search: Router = Router();

// 言葉を検索
search.get("/", searchController.get);

export default search;
