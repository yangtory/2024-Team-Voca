import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  return res.render("voca/menu");
});
router.get("/words", async (req, res) => {
  return res.render("voca/words");
});

export default router;
