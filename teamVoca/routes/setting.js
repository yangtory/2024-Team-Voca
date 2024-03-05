import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const MEMBERS = DB.models.tbl_members;
const VOCAS = DB.models.tbl_vocas;
router.get("/", async (req, res) => {
  const user = req.session.user;
  const userID = user?.m_id;
  return res.render("setting/main", { USER: userID });
});

router.get("/toggle", async (req, res) => {
  const user = req.session.user;
  const userID = user?.m_id;
  try {
    // `v_public` 필드가 'true'인 것을 'false'로 변경
    const result = await VOCAS.update(
      { v_public: "false" },
      {
        where: { v_public: "true", v_mid: userID },
      }
    );
    //  총 업데이트된 레코드 수
    console.log(result);
    return res.redirect("/setting");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/toggleoff", async (req, res) => {
  const user = req.session.user;
  const userID = user?.m_id;
  try {
    // `v_public` 필드가 'true'인 것을 'false'로 변경
    const result = await VOCAS.update(
      { v_public: "true" },
      {
        where: { v_public: "false", v_mid: userID },
      }
    );
    //  총 업데이트된 레코드 수
    console.log(result);
    return res.redirect("/setting");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/login");
});
export default router;
