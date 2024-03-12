import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const MEMBERS = DB.models.tbl_members;

router.get("/", async (req, res) => {
  return res.render("tuto/add");
});

router.get("/quiz", (req, res) => {
  return res.render("tuto/quiz");
});

router.get("/commu", (req, res) => {
  return res.render("tuto/commu");
});

router.get("/setting", (req, res) => {
  return res.render("tuto/setting");
});

router.get("/list", (req, res) => {
  return res.render("tuto/list");
});

router.get("/end", (req, res) => {
  return res.render("tuto/end");
});

router.get("/:select/:m_id", async (req, res) => {
  const m_id = req.params.m_id;
  const select = req.params.select;
  if (select === "go") {
    await MEMBERS.update(
      {
        m_tuto: "1",
      },
      {
        where: { m_tuto: "0", m_id: m_id },
      }
    );
    return res.redirect("/tuto");
  } else if (select === "out") {
    await MEMBERS.update(
      {
        m_tuto: "1",
      },
      {
        where: { m_tuto: "0", m_id: m_id },
      }
    );
    return res.redirect("/voca");
  }
});
export default router;
