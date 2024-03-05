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
  //   return res.json(rows);
  return res.render("commu/community", { VOCAS: rows });
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

router.get("/:v_seq/like", async (req, res) => {
  const id = req.body.m_id;

  // req.session.user = result;
  const v_seq = req.params.v_seq;
  const voca = await VOCAS.findByPk(v_seq);
  const v_rec = voca.v_rec;
  const user = req.session.user ? req.session.user.m_id : undefined;

  let like = v_rec;

  const rec = await LIKE.findAll({ where: { like_user: user, like_vseq: v_seq } });
  if (!rec) {
    req.body.like_user = user;
    req.body.like_vseq = v_seq;
    await LIKE.create(req.body);
    like = v_rec + 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  } else if (rec) {
    await LIKE.destroy({ where: { like_user: user, like_vseq: v_seq } });
    like = v_rec - 1;
    await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
  }
  console.log(rec);
  console.log(req.session.user);
  try {
    return res.json(user);
    // return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});
router.get("/:v_seq/like", async (req, res) => {});
// router.post("/:v_seq/like", async (req, res) => {
//   const v_seq = req.params.v_seq;
//   let like = v_rec + 1;

//   // 단어장주인장이랑 로그인한
//   // if vrec = 0 이면 create
//   // if vrec = 1 이면 destroy

//   req.body.like_user = user;
//   req.body.like_vseq = v_seq;
//   if (v_rec === 0) {
//     await VOCAS.update({ v_rec: like }, { where: { v_seq: v_seq } });
//   }

// });

// router.post("/:v_seq/like", async (req, res) => {
//   const v_seq = req.params.v_seq;
//   console.log(v_seq);
//   try {
//     const voca = await VOCAS.findByPk(v_seq);
//     console.log(voca);
//     if (!voca) {
//       return res.status(404).send("해당 단어를 찾을 수 없습니다.");
//     }

//     voca.likes += 1;
//     await voca.save();
//     return res.send("좋아요를 추가했습니다.");
//   } catch (error) {}
// });

export default router;
