import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const WORDS = DB.models.tbl_words;
const MEMBERS = DB.models.tbl_members;
const VOCAS = DB.models.tbl_vocas;
const LIKE = DB.models.tbl_like;
router.get("/", async (req, res) => {
  const rows = await VOCAS.findAll({
    where: { v_public: "TRUE" },
    include: {
      model: MEMBERS,
      as: "v_멤버",
    },
  });

  return res.render("commu/community", { VOCAS: rows });
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

  return res.redirect("/commu");
});

router.get("/:v_seq/detail", async (req, res) => {
  const v_seq = req.params.v_seq;

  try {
    const rows = await WORDS.findAll({
      where: { w_vseq: v_seq },
    });

    return res.render("commu/detail", { result: rows });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
