import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_words extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    w_seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    w_vseq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_vocas',
        key: 'v_seq'
      }
    },
    w_word: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    w_mean: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    w_pron: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    w_memo: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    w_mark: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_words',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "w_seq" },
        ]
      },
      {
        name: "FK_WSEQ",
        using: "BTREE",
        fields: [
          { name: "w_vseq" },
        ]
      },
    ]
  });
  }
}
