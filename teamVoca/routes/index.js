import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../module/file_upload.js";
const router = express.Router();
const MEMBERS = DB.models.tbl_members;

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index");
});

const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID 없음",
  PASS_WRONG: " 비밀번호 오류",
};

router.get("/login", (req, res) => {
  const message = req.query.fail;
  return res.render("login", { NEED: message });
});

router.post("/login", async (req, res) => {
  const id = req.body.m_id;
  const pw = req.body.m_pw;
  const result = await MEMBERS.findByPk(id);
  if (!result) {
    return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_id === id && result.m_pw !== pw) {
    return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
  } else {
    //로그인되면
    req.session.user = result;
    return res.redirect("/voca");
  }
});

router.get("/join", async (req, res) => {
  await MEMBERS.findAll();
  return res.render("join");
});

router.post("/join", upLoad.single("m_image"), async (req, res) => {
  const data = req.body;
  const file = req.file;

  if (file) {
    req.body.m_image = file.filename;
  }
  const result = await MEMBERS.findAll();
  if (result.length === 0) {
    req.body.m_role = "ADMIN";
    req.body.m_pro = "1";
    req.body.m_tuto = "1";
  } else {
    req.body.m_role = "USER";
    req.body.m_pro = "0";
    req.body.m_tuto = "0";
  }
  try {
    await MEMBERS.create(data);
    return res.redirect("/login");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:m_id/check", async (req, res) => {
  const m_id = req.params.m_id;
  const row = await MEMBERS.findByPk(m_id);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

export default router;
