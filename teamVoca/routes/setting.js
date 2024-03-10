import express from 'express';
import DB from '../models/index.js';
import { upLoad } from '../module/file_upload.js';

const router = express.Router();
const MEMBERS = DB.models.tbl_members;
const VOCAS = DB.models.tbl_vocas;
router.get('/', async (req, res) => {
    const user = req.session.user;
    return res.render('setting/main', { USER: user });
});
router.get('/setting/pro', async (req, res) => {
    const user = req.session.user;
    const m_id = user?.m_id;
    const result = await MEMBERS.findByPk(m_id);
    return res.json(result);
});
router.get('/pro/:m_id', async (req, res) => {
    const m_id = req.params.m_id;

    await MEMBERS.update(
        { m_pro: 'true' },
        {
            where: { m_id },
        }
    );
    return res.redirect('/setting');
});

router.get('/:m_id/update', async (req, res) => {
    const m_id = req.params.m_id;
    try {
        const user = await MEMBERS.findByPk(m_id);
        return res.render('join', { USER: user });
    } catch (error) {
        return res.json(error);
    }
});

router.post('/:m_id/update', upLoad.single('m_image'), async (req, res) => {
    const m_id = req.params.m_id;
    const file = req.file;
    const data = req.body;
    if (file) {
        req.body.m_image = file.filename;
    }
    await MEMBERS.update(data, { where: { m_id: m_id } });
    const user = await MEMBERS.findByPk(m_id);
    return res.render('setting/main', { USER: user });
});

router.get('/toggle', async (req, res) => {
    const user = req.session.user;
    const userID = user?.m_id;
    try {
        // `v_public` 필드가 'true'인 것을 'false'로 변경
        const result = await VOCAS.update(
            { v_public: 'false' },
            {
                where: { v_public: 'true', v_mid: userID },
            }
        );
        //  총 업데이트된 레코드 수
        console.log(result);
        return res.redirect('/setting');
    } catch (error) {
        return res.json(error);
    }
});

router.get('/toggleoff', async (req, res) => {
    const user = req.session.user;
    const userID = user?.m_id;
    try {
        // `v_public` 필드가 'true'인 것을 'false'로 변경
        const result = await VOCAS.update(
            { v_public: 'true' },
            {
                where: { v_public: 'false', v_mid: userID },
            }
        );
        //  총 업데이트된 레코드 수
        console.log(result);
        return res.redirect('/setting');
    } catch (error) {
        return res.json(error);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
});

router.get('/drop/:m_id', async (req, res) => {
    const id = req.params.m_id;
    await MEMBERS.destroy({
        where: { m_id: id },
    });
    return res.redirect('/login');
});

export default router;
