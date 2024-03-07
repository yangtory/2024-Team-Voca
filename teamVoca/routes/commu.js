import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const WORDS = DB.models.tbl_words;
const MEMBERS = DB.models.tbl_members;
const VOCAS = DB.models.tbl_vocas;
const LIKE = DB.models.tbl_like;
const COMMENT = DB.models.tbl_comment;

router.get("/", async (req, res) => {
  return res.render("commu/main");
});

router.get("/vocas", async (req, res) => {
  const user = req.session.user;
  const userID = user?.m_id;
  const row = await LIKE.findAll({
    where: { like_user: userID },
  });

  const rows = await VOCAS.findAll({
    where: { v_public: "TRUE" },
    include: {
      model: MEMBERS,
      as: "v_멤버",
    },
    include: {
      model: LIKE,
      as: "L_좋아요",
    },
  });
  // return res.json(rows);
  return res.render("commu/community", { VOCAS: rows, LIKE: row });
});

router.get("/:v_seq/like", async (req, res) => {
  const v_seq = req.params.v_seq;

  const voca = await VOCAS.findByPk(v_seq);

  console.log(voca);
  const v_rec = voca.v_rec;
  const user = req.session.user ? req.session.user.m_id : undefined;

  let like = voca.v_rec;

  const rec = await LIKE.findAll({ where: { like_user: user, like_vseq: v_seq } });
  if (rec.length === 0) {
    req.body.like_user = user;
    req.body.like_vseq = v_seq;
    await LIKE.create(req.body);
    like = v_rec + 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  } else {
    await LIKE.destroy({ where: { like_user: user, like_vseq: v_seq } });

    like = v_rec - 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  }

  return res.redirect("/commu/vocas");
});

router.get("/:v_seq/detail", async (req, res) => {
  const v_seq = req.params.v_seq;

  const rows = await WORDS.findAll({
    where: { w_vseq: v_seq },
  });
  const voca = await VOCAS.findByPk(v_seq);
  const comment = await COMMENT.findAll({
    where: { c_vseq: v_seq },
    include: [
      {
        model: MEMBERS,
        as: "c_유저",
      },
      {
        model: VOCAS,
        as: "c_단어장",
      },
    ],
  });
  console.log(comment);
  //   return res.json({ COMMENT: comment });
  return res.render("commu/detail", { rows, voca, COMMENT: comment });
});

router.post("/:v_seq/detail", async (req, res) => {
  const v_seq = req.params.v_seq;
  // 단어장번호 가져오고
  const user = req.session.user ? req.session.user.m_id : undefined;
  // 현재 로그인한 유저 정보가져오고
  const comment = req.body.c_comment;
  req.body.c_user = user;
  req.body.c_vseq = v_seq;
  console.log("유저", user);
  console.log("단어장번호", v_seq);
  console.log("댓글내용", comment);
  await COMMENT.findAll({
    include: {
      model: MEMBERS,
      as: "v_멤버",
    },
    include: {
      model: VOCAS,
      as: "c_단어장",
    },
  });
  await COMMENT.create(req.body);
  console.log("댓글확인", req.body);
  return res.redirect(`/commu/${v_seq}/detail`);
  //   return res.render("commu/detail", { rows });
});

export default router;
