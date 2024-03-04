import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const WORDS = DB.models.tbl_words;
const MEMBERS = DB.models.tbl_members;
const VOCAS = DB.models.tbl_vocas;
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
  const v_seq = req.params.v_seq;
  const row = await VOCAS.findAll();

  return res.json(row);
});
// router.get("/:vseq/like", async (req, res) => {
//   return res.send("좋아요");
// });
// router.post("/:vseq/like", async (req, res) => {
//   return res.send("좋아요");
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

// VOCAS.findAll({ where: { v_public: "true" } });

// -- 단어장
// DROP DATABASE vocaDB;
// CREATE DATABASE vocaDB;
// USE vocaDB;

// CREATE TABLE tbl_words (
// w_seq	INT AUTO_INCREMENT PRIMARY KEY,
// w_vseq	INT	NOT NULL	,
// w_word	VARCHAR(50)	NOT NULL	,
// w_mean	VARCHAR(125)	NOT NULL,
// w_pron	VARCHAR(50)		,
// w_memo	VARCHAR(125)	,
// w_mark	VARCHAR(5)
// );

// INSERT INTO tbl_words
// (w_vseq, w_word, w_mean, w_mark)
// VALUE ("1","apple", "사과", "true");
// SELECT * FROM tbl_words;

// CREATE TABLE tbl_vocas (
// v_seq	INT	 AUTO_INCREMENT	PRIMARY KEY,
// v_mid	VARCHAR(20)	NOT NULL	,
// v_name	VARCHAR(20)	NOT NULL	,
// v_public	VARCHAR(5)		,
// v_rec	INT
// );

// SELECT * FROM tbl_vocas;

// CREATE TABLE tbl_members(
// m_id	VARCHAR(20)		PRIMARY KEY,
// m_pw	VARCHAR(125)	NOT NULL	,
// m_nick	VARCHAR(20)		,
// m_image	VARCHAR(225)
// );

// SELECT * FROM tbl_members;

// -- 단어장seq 외래키
// ALTER TABLE tbl_words
// ADD CONSTRAINT FK_WSEQ
// FOREIGN KEY (w_vseq)
// REFERENCES tbl_vocas(v_seq);

// -- id 외래키
// ALTER TABLE tbl_vocas
// ADD CONSTRAINT FK_MID
// FOREIGN KEY (v_mid)
// REFERENCES tbl_members(m_id);

// DESC tbl_words;

// INSERT INTO tbl_members (m_id, m_pw, m_nick)
// VALUES ("정연", "123", "토리");

// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","승희단어장", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","승희단어장", "FALSE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","승희단어장2", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","승희단어장3", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","정연단어장", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("승희","연수단어장", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("정연","정연단어장1", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("정연","정연단어장2", "TRUE");
// INSERT INTO tbl_vocas
// (v_mid, v_name, v_public)
// VALUES ("정연","정연단어장3", "TRUE");
