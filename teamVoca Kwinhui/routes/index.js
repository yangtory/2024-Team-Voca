import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index");
});
router.get("/login", async (req, res, next) => {
  return res.render("login");
});
router.get("/join", async (req, res) => {
  return res.render("join");
});

export default router;
