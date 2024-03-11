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
  const user = req.session.user ? req.session.user.m_id : undefined;

  return res.render("commu/detail", { rows, voca, COMMENT: comment, user });
});

router.post("/:v_seq/detail", async (req, res) => {
  const v_seq = req.params.v_seq;
  // 단어장번호 가져오고
  const user = req.session.user ? req.session.user.m_id : undefined;
  // 현재 로그인한 유저 정보가져오고
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
  //   return res.render("commu/detail", { rows });
});

// router.get("/:v_seq/detail/delete", async (req, res) => {
//   const v_seq = req.params.v_seq;
//   const user = req.session.user ? req.session.user.m_id : undefined;

//   const row = await COMMENT.findByPk(user);
//   await row.destroy();
//   return res.redirect(`/commu/${v_seq}/detail`);
// });

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

router.get("/:v_seq/update/:c_seq", async (req, res) => {
  const c_seq = req.params.c_seq;
  const v_seq = req.params.v_seq;
  const row = await COMMENT.findByPk(c_seq);

  return res.json(row);
});

// 물어보기
router.post("/:v_seq/update/:c_seq", async (req, res) => {
  const v_seq = req.params.v_seq;
  const c_seq = req.params.c_seq;
  const row = await COMMENT.findByPk(c_seq);
  const data = req.body;
  console.log("data ", data);
  console.log("v_seq ", v_seq);
  console.log("c_seq ", c_seq);
  console.log("row ", row);
  try {
    const row = await row.update(data, {
      where: { c_seq },
    });
    return res.json(row);
    // return res.redirect(`/commu/${v_seq}/detail`);
  } catch (error) {
    return res.json(error);
  }
});
export default router;
