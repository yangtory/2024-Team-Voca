import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index");
});

export default router;
