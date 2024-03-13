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
    where: {
      like_user: userID,
    },
  });

  const rows = await VOCAS.findAll({
    where: { v_public: "TRUE" },
    include: [
      {
        model: MEMBERS,
        as: "v_멤버",
      },
      {
        model: LIKE,
        as: "L_좋아요",
      },
    ],
  });

  // return res.json(row);
  // return res.json({ rows, row, userID });
  return res.render("commu/community", { VOCAS: rows, LIKE: row, user: userID });
});

router.get("/:v_seq/like", async (req, res) => {
  const v_seq = req.params.v_seq;

  const voca = await VOCAS.findByPk(v_seq);

  const v_rec = voca.v_rec;
  const user = req.session.user;
  const userID = user?.m_id;

  let like = voca.v_rec;


  const rec = await LIKE.findAll({ where: { like_user: userID, like_vseq: v_seq } });
  if (rec.length === 0) {
    req.body.like_user = userID;
    req.body.like_vseq = v_seq;
    await LIKE.create(req.body);
    like = v_rec + 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  } else {
    await LIKE.destroy({ where: { like_user: userID, like_vseq: v_seq } });


    like = v_rec - 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  }
  const row = await LIKE.findAll({
    where: { like_user: userID },
  });
  const rows = await VOCAS.findAll({
    where: { v_public: "TRUE" },
    include: [
      {
        model: MEMBERS,
        as: "v_멤버",
      },
      {
        model: LIKE,
        as: "L_좋아요",
      },
    ],
  });
  // return res.json(row);

  // return res.render("commu/community", { VOCAS: rows, LIKE: row, user: userID });
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
  const user = req.session.user ? req.session.user.m_id : undefined;


  return res.render("commu/detail", { rows, voca, COMMENT: comment, user });

});

router.post("/:v_seq/detail", async (req, res) => {
  const v_seq = req.params.v_seq;

  const user = req.session.user ? req.session.user.m_id : undefined;

  const c_seq = req.query.seq;
  req.body.c_user = user;
  req.body.c_vseq = v_seq;
  if (c_seq) {
    await COMMENT.update(req.body, { where: { c_seq } });
  } else {
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
  }

  return res.redirect(`/commu/${v_seq}/detail`);
});

router.get("/:v_seq/detail/delete/:c_seq", async (req, res) => {
  const v_seq = req.params.v_seq;
  const c_seq = req.params.c_seq;
  const user = req.session.user ? req.session.user.m_id : undefined;

  try {
    const row = await COMMENT.findByPk(c_seq);
    if (row && row.c_user === user) {
      await row.destroy();
    }
    return res.redirect(`/commu/${v_seq}/detail`);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:v_seq/get/:c_seq", async (req, res) => {
  const c_seq = req.params.c_seq;
  const v_seq = req.params.v_seq;
  const row = await COMMENT.findByPk(c_seq);

  return res.json(row);
});

router.post("/:v_seq/update/:c_seq", async (req, res) => {
  const c_seq = req.params.c_seq;
  const v_seq = req.params.v_seq;
  await COMMENT.update(req.body, {
    where: {
      c_seq,
    },
  });

  return res.redirect(`/commu/${v_seq}/detail`);
});

router.get("/free", async (req, res) => {
  const user = req.session.user ? req.session.user.m_id : undefined;
  req.body.like_user = user;

  const row = await VOCAS.findAll({
    include: [
      {
        model: LIKE,
        as: "L_좋아요",
        where: {
          like_user: user,
        },
      },
      { model: MEMBERS, as: "v_멤버" },
    ],
  });

  return res.render("commu/likevocas", { row });

  //  return res.json(row);
  // console.log(row.v_mid);
});

export default router;
