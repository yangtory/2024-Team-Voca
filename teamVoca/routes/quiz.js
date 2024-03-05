import express from "express";
import { translateText } from "../config/naver_secret_sample.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // return res.json(words);
  return res.render("quiz/quizmain");
});

router.get("/search", async (req, res) => {
  const search = req.query.search;
  const words = await translateText();
  return res.json(words);
});
export default router;
