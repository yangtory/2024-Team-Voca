import express, { Router } from "express";
import DB from "../models/index.js";

const VOCA = DB.models.tbl_vocas; // 단어장
const WORD = DB.models.tbl_tbl_words; // 단어장 안의 >>단어<<

const router = express.Router();

/* GET users listing. */

// voca 에서 누르면 추가한 단어리스트가 보임 : 로그인아이디 단어장 전부
// w_seq	단어번호
// w_vseq	 단어장번호
router.get("/", async (req, res, next) => {
  // const user = req.session.user ? req.session.user.m_id : undefined;
  // 로그인 한 유저 단어장 전부 가져오기
  // const row = await findAll({ where: {v_name : user} });
  return res.render("voca/menu");
});
// -----------------------------------------------
router.get("/words", async (req, res) => {
  return res.render("voca/words");
});

// -----단어>>장<< 추가 페이지------
router.get("/add", async (req, res) => {
  return res.render("voca/add");
});

router.post("/add", async (req, res) => {
  // 단어장 생성자 이름에 유저아이디 집어넣기
  // const user = req.session.user ? req.session.user.m_id : undefined;
  // req.body.v_name = user;
  // req.body.v_rec = 0; // 추천에 숫자나와야하니까 0넣어두고
  // VOCA.create(req.body);
  // 단어장 만들면 만든 단어장 안에 단어추가 하는페이지로
  // return res.redirect("/vaca/단어추가")
});
// --------- 단어 추가 (단어장안)--------------
// 주소에 만들어진 단어장번호
// 단어장이름 가져와서 맨위에 띄우고
// 그리고 params 단어장번호 -> w_vseq 집어넣고 // req.body.w_vseq =
// 단어1개 추가하고 다시 추가화면으로 돌아오고, 1개이상 추가됐으면
// 단어장리스트 보는 버튼 생기게 만들기

// 임시 라우터 : 단어추가 화면구현용
router.get("/add_words", async (req, res) => {
  return res.render("voca/add_words");
});
export default router;
