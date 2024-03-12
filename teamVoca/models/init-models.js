import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_comment from "./tbl_comment.js";
import _tbl_like from "./tbl_like.js";
import _tbl_members from "./tbl_members.js";
import _tbl_vocas from "./tbl_vocas.js";
import _tbl_words from "./tbl_words.js";

export default function initModels(sequelize) {
  const tbl_comment = _tbl_comment.init(sequelize, DataTypes);
  const tbl_like = _tbl_like.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_vocas = _tbl_vocas.init(sequelize, DataTypes);
  const tbl_words = _tbl_words.init(sequelize, DataTypes);

  tbl_comment.belongsTo(tbl_members, { as: "c_유저", foreignKey: "c_user" });
  tbl_members.hasMany(tbl_comment, { as: "tbl_comments", foreignKey: "c_user" });
  tbl_like.belongsTo(tbl_members, { as: "L_멤버", foreignKey: "like_user" });
  tbl_members.hasMany(tbl_like, { as: "tbl_likes", foreignKey: "like_user" });
  tbl_vocas.belongsTo(tbl_members, { as: "v_멤버", foreignKey: "v_mid" });
  tbl_members.hasMany(tbl_vocas, { as: "tbl_vocas", foreignKey: "v_mid" });
  tbl_comment.belongsTo(tbl_vocas, { as: "c_단어장", foreignKey: "c_vseq" });
  tbl_vocas.hasMany(tbl_comment, { as: "tbl_comments", foreignKey: "c_vseq" });
  tbl_like.belongsTo(tbl_vocas, { as: "L_단어장", foreignKey: "like_vseq" });
  tbl_vocas.hasMany(tbl_like, { as: "L_좋아요", foreignKey: "like_vseq" });
  tbl_words.belongsTo(tbl_vocas, { as: "W_단어장", foreignKey: "w_vseq" });
  tbl_vocas.hasMany(tbl_words, { as: "W_단어", foreignKey: "w_vseq" });

  return {
    tbl_comment,
    tbl_like,
    tbl_members,
    tbl_vocas,
    tbl_words,
  };
}
