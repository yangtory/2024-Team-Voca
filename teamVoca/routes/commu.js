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
  //   const rows = await VOCAS.findByPk(v_seq);
  const rows = await VOCAS.findAll({
    include: {
      model: WORDS,
      as: "tbl_words",
    },
  });
  return res.json(rows);
  //   return res.render("commu/detail");
});

export default router;

// VOCAS.findAll({ where: { v_public: "true" } });
