import express, { Router } from "express";
import DB from "../models/index.js";

const VOCA = DB.models.tbl_vocas; // 단어장
const WORDS = DB.models.tbl_words; // 단어장 안의 >>단어<<

const router = express.Router();

/* GET users listing. */

// voca 에서 누르면 추가한 단어리스트가 보임 : 로그인아이디 단어장 전부
// w_seq	단어번호
// w_vseq	 단어장번호
router.get("/", async (req, res, next) => {
  // const user = req.session.user ? req.session.user.m_id : undefined;
  // 로그인 한 유저 단어장 전부 가져오기
  // const rows = await findAll({ where: {v_name : user} });
  // return res.render("voca/menu", {rows});
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
  const user = req.session.user ? req.session.user.m_id : undefined;
  // const user = req.session.user.m_id
  req.body.v_mid = user; // 단어장 작성자에 로그인유저넣고
  req.body.v_rec = 0; // 추천에 숫자나와야하니까 0 넣어두고

  await VOCA.create(req.body);
  // 단어장 만들고, 만들어졌으니까.. 지금 만든단어장에서
  // 단어추가하는 페이지로 이동시키기..

// 지금 로그인을 한 >>유저의<< 가장 >>마지막 단어장 번호<<. 그게 지금생성한거
const newvoca = await VOCA.findAll({
  where: {
    v_mid: user 
  },
  order: [["v_seq", "DESC"]], 
  limit: 1  
});

  // return res.json(newvoca); // 확인용

  const newvoca_seq = newvoca[0].v_seq // 찾아와서 번호가져오고

  return res.redirect(`/voca/${newvoca_seq}/add_words`) // 만든 단어장 단어추가로이동
});
// --------- 단어 추가 (단어장안)--------------
// 단어1개 추가하고 다시 추가화면으로 돌아오고, 1개이상 추가됐으면
// 단어장리스트 보는 버튼 생기게 만들기

router.get("/:newvoca_seq/add_words", async (req, res) => {
  // 단어추가하려면 단어장번호가 필요하고, 화면에 단어장이름 보여줘야하니까
  const newvoca_seq = req.params.newvoca_seq;
  const newvoca= await VOCA.findByPk(newvoca_seq);
  const newvoca_name = newvoca.v_name;


  req.body.w_vseq = newvoca_seq;

// return res.json({newvoca_name});

  return res.render("voca/add_words",{newvoca_name});
});

router.post("/:newvoca_seq/add_words", async (req, res) => {
  const newvoca_seq = req.params.newvoca_seq;
  req.body.w_vseq = newvoca_seq;

  await WORDS.create(req.body);

  // 계속 추가할 수 있게
  return res.redirect(`/voca/${newvoca_seq}/add_words`);
});


// 임시이동용
router.get("/add_words",async (req,res)=>{
  return res.render("voca/add_words");
})

export default router;
