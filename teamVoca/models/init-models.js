import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_like from  "./tbl_like.js";
import _tbl_members from  "./tbl_members.js";
import _tbl_vocas from  "./tbl_vocas.js";
import _tbl_words from  "./tbl_words.js";

export default function initModels(sequelize) {
  const tbl_like = _tbl_like.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_vocas = _tbl_vocas.init(sequelize, DataTypes);
  const tbl_words = _tbl_words.init(sequelize, DataTypes);

<<<<<<< HEAD
  tbl_vocas.belongsTo(tbl_members, { as: "v_멤버", foreignKey: "v_mid" });
  tbl_members.hasMany(tbl_vocas, { as: "tbl_vocas", foreignKey: "v_mid" });
  tbl_words.belongsTo(tbl_vocas, { as: "w_vseq_tbl_voca", foreignKey: "w_vseq" });
  tbl_vocas.hasMany(tbl_words, { as: "W_단어", foreignKey: "w_vseq" });
=======
  tbl_like.belongsTo(tbl_members, { as: "like_user_tbl_member", foreignKey: "like_user"});
  tbl_members.hasMany(tbl_like, { as: "tbl_likes", foreignKey: "like_user"});
  tbl_vocas.belongsTo(tbl_members, { as: "v_m", foreignKey: "v_mid"});
  tbl_members.hasMany(tbl_vocas, { as: "tbl_vocas", foreignKey: "v_mid"});
  tbl_like.belongsTo(tbl_vocas, { as: "like_vseq_tbl_voca", foreignKey: "like_vseq"});
  tbl_vocas.hasMany(tbl_like, { as: "tbl_likes", foreignKey: "like_vseq"});
  tbl_words.belongsTo(tbl_vocas, { as: "w_vseq_tbl_voca", foreignKey: "w_vseq"});
  tbl_vocas.hasMany(tbl_words, { as: "tbl_words", foreignKey: "w_vseq"});
>>>>>>> ae55e4a2dadea6958a96549dc44629a6dd248e6e

  return {
    tbl_like,
    tbl_members,
    tbl_vocas,
    tbl_words,
  };
}
