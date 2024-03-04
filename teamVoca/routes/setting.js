import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const MEMBERS = DB.models.tbl_members;

router.get("/", async (req, res) => {
  const user = req.session.user;
  const userID = user.m_id;
  return res.render("setting/main", { USER: userID });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/login");
});
export default router;
