import express from 'express';
import DB from '../models/index.js';
const router = express.Router();
const MEMBERS = DB.models.tbl_members;

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('index');
});

const LOGIN_MESSAGE = {
    USER_NOT: '사용자 ID 없음',
    PASS_WRONG: ' 비밀번호 오류',
};

router.get('/login', (req, res) => {
    const message = req.query.fail;
    return res.render('login', { NEED: message });
});

router.post('/login', async (req, res) => {
    const id = req.body.m_id;
    const pw = req.body.m_pw;
    const result = await MEMBERS.findByPk(id);
    if (!result) {
        return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
    } else if (result.m_id === id && result.m_pw !== pw) {
        return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
    } else {
        // req.session.user = result;
        return res.redirect('/voca');
    }
});

router.get('/join', async (req, res) => {
    return res.render('join');
});

router.post('/join', async (req, res) => {
    const data = req.body;
    try {
        await MEMBERS.create(data);
        return res.redirect('/login');
    } catch (error) {
        return res.json(error);
    }
});

export default router;
