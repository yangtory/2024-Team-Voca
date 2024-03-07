import express from 'express';
import { translateText } from '../config/api.js';
import DB from '../models/index.js';
const VOCAS = DB.models.tbl_vocas;
const LIKE = DB.models.tbl_like;
const WORDS = DB.models.tbl_words;
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('quiz/quizmain');
});

router.get('/mylist', async (req, res) => {
    const user = req.session.user;
    const userID = user?.m_id;
    const vocas = await VOCAS.findAll({
        where: { v_mid: userID },
    }); //내단어장
    // return res.json(count_words);
    return res.render('quiz/list', { VOCAS: vocas });
});

router.get('/likelist', async (req, res) => {
    const user = req.session.user;
    const userID = user?.m_id;
    const like_vocas = await LIKE.findAll({
        where: { like_user: userID },
        include: {
            model: VOCAS,
            as: 'L_단어장',
        },
    });
    return res.render('quiz/list', { LIKEVOCAS: like_vocas });
});

router.get('/menu/:v_seq', async (req, res) => {
    const v_seq = req.params.v_seq;
    return res.render('quiz/menu', { VOCA: v_seq });
});

let currentIndex = 0;
let currentWord = 0;
router.get('/getword/:v_seq', async (req, res) => {
    const v_seq = req.params.v_seq;
    const result = await WORDS.findAll({
        where: { w_vseq: v_seq },
    });
    if (currentIndex < result.length) {
        currentWord = result[currentIndex];
        const jsonData = { WORD: currentWord };
        res.json(jsonData);
        return res.render('quiz/start', { WORD: currentWord });
    } else {
        return res.json({ message: '단어 없음' });
    }
});

router.get('/nextword/:w_vseq', async (req, res) => {
    const w_vseq = req.params.w_vseq;
    const result = await WORDS.findAll({
        where: { w_vseq: w_vseq },
    });

    if (currentIndex < result.length - 1) {
        currentIndex++;
        console.log(currentIndex);
        return res.json({ message: '다음단어' });
    } else {
        return res.json({ message: '단어없음' });
    }
});
// router.get("/search", async (req, res) => {
//   const search = req.query.search;
//   const words = await translateText(search);
//   console.log(words[1].data.translations[0]);
//   console.log(words);
//   return res.render("quiz/quizmain", { word: words[0] });
// });
export default router;
