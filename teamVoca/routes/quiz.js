import express from 'express';
import { getWords } from '../module/naver_api.js';

const router = express.Router();

router.get('/', async (req, res) => {
    // return res.json(words);
    return res.render('quiz/quizmain');
});

router.get('/kakao', async (req, res) => {
    const search = req.query.search;
    const words = await getWords(search);
    return res.json(words);
    return res.render('quiz/quizmain', { WORDS: words });
});
export default router;
