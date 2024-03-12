import express, { Router } from "express";
import DB from "../models/index.js";

const VOCA = DB.models.tbl_vocas; // 단어장
const WORDS = DB.models.tbl_words; // 단어장 안의 >>단어<<
const LIKE = DB.models.tbl_like;
const COMMENT = DB.models.tbl_comment;
const MEMBERS = DB.models.tbl_members;

const router = express.Router();

/* GET users listing. */

router.get("/pro/:m_id", async (req, res) => {
  const m_id = req.params.m_id;
  const rows = await VOCA.findAll({ where: { v_mid: m_id } });
  const pro = await MEMBERS.findAll({ where: { m_id: m_id } });

  await MEMBERS.update(
    { m_pro: "true" },
    {
      where: { m_id },
    }
  );
  return res.render("voca/menu2", { rows, USER: pro[0] });
});

// voca 에서 누르면 추가한 단어리스트가 보임 : 로그인아이디 단어장 전부
// w_seq	단어번호
// w_vseq	 단어장번호
router.get("/", async (req, res, next) => {
  const user = req.session.user ? req.session.user.m_id : undefined;
  // 로그인 한 유저 단어장 전부 가져오기
  const rows = await VOCA.findAll({ where: { v_mid: user } });
  const pro = await MEMBERS.findAll({ where: { m_id: user } });

  return res.render("voca/menu2", { rows, USER: pro[0] });
  // return res.render("voca/menu2");
});

//------------- 단어장의 단어들 보여주기
router.get("/:voca_seq/words", async (req, res) => {
  const v_seq = req.params.voca_seq;
  const words = await WORDS.findAll({
    where: {
      w_vseq: v_seq,
    },
  });
  //단어장 이름보여주고 번호도 필요하니까
  const voca = await VOCA.findByPk(v_seq);
  // const voca_name = voca.v_name;
  return res.render("voca/invoca_words", { words, voca });
});
// ---------------- 단어장의 댓글보기 -----------------
// `/voca/${voca_seq}/comment`
router.get("/:voca_seq/comment", async (req, res) => {
  const voca_seq = req.params.voca_seq;

  const voca = await VOCA.findByPk(voca_seq);
  const voca_name = voca.v_name;

  const coms = await COMMENT.findAll({
    where: {
      c_vseq: voca_seq,
    },
    include: [
      {
        model: MEMBERS,
        as: "c_유저",
      },
    ],
  });

  // return res.json({ comments });
  return res.render("voca/invoca_comments", { coms, voca_name });
});
// ----------------단어장에 달린 댓글 지우기 --------
// `/voca/comment/${c_seq}/delete`   삭제주소
router.get("/comment/:c_seq/delete", async (req, res) => {
  const c_seq = req.params.c_seq;
  const com = await COMMENT.findByPk(c_seq);
  const v_seq = com.c_vseq;
  await COMMENT.destroy({ where: { c_seq: c_seq } });

  // /voca/1/comment 돌아갈 주소 원래보던 댓글화면
  return res.redirect(`/voca/${v_seq}/comment`);
});
// -----------------단어장 정보수정(이름,공개여부---------------------
router.get("/:v_seq/update", async (req, res) => {
  const v_seq = req.params.v_seq;
  const voca = await VOCA.findByPk(v_seq);
  return res.render("voca/add", { voca });
});

router.post("/:v_seq/update", async (req, res) => {
  const v_seq = req.params.v_seq;
  await VOCA.update(req.body, { where: { v_seq: v_seq } });

  return res.redirect(`/voca/${v_seq}/words`); // 단어장 화면으로
});
//-----------------------단어 수정---------------------------------

router.get("/:w_seq/words/update", async (req, res) => {
  const w_seq = req.params.w_seq;
  const word = await WORDS.findByPk(w_seq);
  // 단어장이름도 보여줘야 하니까
  const voca_seq = word.w_vseq;
  const voca = await VOCA.findByPk(voca_seq);
  const voca_name = voca.v_name;
  // >단어<수정이지만 이 단어가 있는 단어장으로 리스트 눌렀을때 가야하니까 단어장 번호도 같이 보내기
  return res.render("voca/add_words", {
    word,
    voca_name,
    w_seq,
    voca_seq,
  });
});

router.post("/:w_seq/words/update", async (req, res) => {
  const w_seq = req.params.w_seq;
  await WORDS.update(req.body, { where: { w_seq: w_seq } });

  // 수정하고 나면 단어장 화면으로
  const word = await WORDS.findByPk(w_seq);
  const v_seq = word.w_vseq;
  return res.redirect(`/voca/${v_seq}/words`);
});
//-----------------------------------------------------------------

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
      v_mid: user,
    },
    order: [["v_seq", "DESC"]],
    limit: 1,
  });

  // return res.json(newvoca); // 확인용

  const newvoca_seq = newvoca[0].v_seq; // 찾아와서 번호가져오고

  return res.redirect(`/voca/${newvoca_seq}/add_words`); // 만든 단어장 단어추가로이동
});
// --------- 단어 추가 (단어장안)--------------

router.get("/:newvoca_seq/add_words", async (req, res) => {
  // 단어추가하려면 단어장번호가 필요하고, 화면에 단어장이름 보여줘야하니까
  const newvoca_seq = req.params.newvoca_seq;
  const newvoca = await VOCA.findByPk(newvoca_seq);
  const newvoca_name = newvoca.v_name;

  // req.body.w_vseq = newvoca_seq; 이건왜 여기썼지

  // return res.json({newvoca_name});
  // 단어장이름, 번호 보내주고
  return res.render("voca/add_words", { newvoca_name, newvoca_seq });
});

router.post("/:newvoca_seq/add_words", async (req, res) => {
  const newvoca_seq = req.params.newvoca_seq;
  req.body.w_vseq = newvoca_seq;

  await WORDS.create(req.body);

  // 계속 추가할 수 있게..
  return res.redirect(`/voca/${newvoca_seq}/add_words`);
});

// -------------------- 단어장 삭제 --------------
router.get("/:voca_seq/delete", async (req, res) => {
  const v_seq = req.params.voca_seq;

  //  단어장 삭제하면 추천 테이블도 모두 삭제되야하니까
  // 이 단어장의 추천테이블 먼저 삭제하고
  await LIKE.destroy({ where: { like_vseq: v_seq } });

  // 댓글도 모조리 삭제
  await COMMENT.destroy({ where: { c_vseq: v_seq } });
  //  단어장안 단어 삭제
  await WORDS.destroy({ where: { w_vseq: v_seq } });
  // 단어장을 제일마지막에 삭제
  await VOCA.destroy({ where: { v_seq: v_seq } }); // FK..

  return res.redirect("/voca");
});
// ----------- 단어장 안 >단어< 삭제 ------------
// 단어 수정주소 /:w_seq/words/update
router.get("/:w_seq/words/delete", async (req, res) => {
  const w_seq = req.params.w_seq;

  // 단어장 번호
  const word = await WORDS.findByPk(w_seq);
  const v_seq = word.w_vseq;
  await WORDS.destroy({ where: { w_seq: w_seq } });
  // 현재 단어장 주소 /voca/3/words (단어장번호)
  return res.redirect(`/voca/${v_seq}/words`);
});

//----------------------- 번역용 ----------------------------------
import { translateText } from "../config/api.js";
// 번역을 할 수 있는페이지와, 번역을 처리하는 주소 2개가 필요
// 단어장 입력주소
// /voca/7/add_words /단어장번호
// /voca/10/words/update 수정 주소 두개에서 search 되야하니까 두개다 만들기
// 검색해서 띄워주고 원래 단어추가 화면처럼 보여야하니...
// redirct 를 쓸 수 없으니까 / 이 경우의 단어추가를 아예새로?
// 그럼 추가,수정의 경우 2가지다 되야하니까 (화면 주소못바꾸니) 번역주소 2개, post도 2개..
// post까지
// 4개...

// 화면 보이는 get은 원래 있던걸로 하고,
// 번역을 >>번역 처리할<< 주소 2개 만들기
router.get("/:newvoca_seq/add_words/wordsearch", async (req, res) => {
  const search = req.query.search;
  const words = await translateText(search);
  console.log(words[1].data.translations[0]);
  console.log(words);
  // --------------------------------------------

  // 번역을 한 경우에도 원래와 같이 추가가 가능하게.. 똑같은 형식
  // 주소는 다르지만 이전의 생성과 동일해보이게
  const newvoca_seq = req.params.newvoca_seq;
  const newvoca = await VOCA.findByPk(newvoca_seq);
  const newvoca_name = newvoca.v_name;

  // 번역된 단어와, 단어장 이름을 보내고
  // 번역 폼이 pug if newvoca_seq 니까 번호또 보내서 또 번역 가능하게
  return res.render("voca/add_words", {
    t_word: words[0],
    newvoca_name,
    newvoca_seq,
  });
});
//  & 번역페이지 단어 생성
router.post(
  "/:newvoca_seq/add_words/wordsearch?search=:search_word",
  async (req, res) => {
    const newvoca_seq = req.params.newvoca_seq;
    req.body.w_vseq = newvoca_seq;

    // return res.json(req.body);
    await WORDS.create(req.body);

    // 계속 추가할 수 있게..
    return res.redirect(`/voca/${newvoca_seq}/add_words`);
  }
);
// -----------------------------------------------
//  단어 수정에서 번역사용시
router.get("/:w_seq/words/update/wordsearch", async (req, res) => {
  const search = req.query.search;
  const words = await translateText(search);
  console.log(words[1].data.translations[0]);
  console.log(words);
  // ---------
  const w_seq = req.params.w_seq;
  const word = await WORDS.findByPk(w_seq);
  // 단어장이름도 보여줘야 하니까
  const voca_seq = word.w_vseq;
  const voca = await VOCA.findByPk(voca_seq);
  const voca_name = voca.v_name;
  // 여기서도 w_seq 를보내는 이유는 번역또 쓸 수 있어야하니까
  // pug if w_seq
  return res.render("voca/add_words", {
    word,
    voca_name,
    voca_seq,
    w_seq,
    t_word: words[0],
  });
  // 원래 수정에서 w_seq, 단어번호 (if문 용)
  // t_word: words[0], 번역된단어 2개 더보내기.
});
// ------------- 수정 에서 번역하고 단어 생성하기
router.post(
  "/:w_seq/words/update/wordsearch?search=:search_word",
  async (req, res) => {
    const w_seq = req.params.w_seq;
    await WORDS.update(req.body, { where: { w_seq: w_seq } });

    // 수정하고 나면 단어장 화면으로
    const word = await WORDS.findByPk(w_seq);
    const v_seq = word.w_vseq;
    return res.redirect(`/voca/${v_seq}/words`);
  }
);

router.get("getinfo/:vseq", async (req, res) => {
  const vseq = req.params.vseq;
  const result = await VOCA.findAll({ where: { v_seq: vseq } });
  return res.json(result);
});

export default router;
// --------------- test --------------
// 번역을 할 수 있는페이지와, 번역을 처리하는 주소 2개가 필요

// router.get("/search", async (req, res) => {
//   return res.render("voca/test");
// });
// // form(action="/voca/wordsearch") pug의 action 주소
// router.get("/wordsearch", async (req, res) => {
//   const search = req.query.search;
//   const words = await translateText(search);
//   console.log(words[1].data.translations[0]);
//   console.log(words);
//   return res.render("voca/test", { word: words[0] });
//   // return res.render("voca/test");
// });
