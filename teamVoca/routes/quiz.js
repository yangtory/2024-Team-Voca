import express from "express";
import { translateText } from "../config/api.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // return res.json(words);
  return res.render("quiz/quizmain");
});

router.get("/search", async (req, res) => {
  const search = req.query.search;
  const words = await translateText(search);
  console.log(words[1].data.translations[0]);
  console.log(words);
  return res.render("quiz/quizmain", { word: words[0] });
});
export default router;
