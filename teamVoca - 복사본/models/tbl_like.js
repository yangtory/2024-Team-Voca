import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_like extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    like_seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    like_user: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'tbl_members',
        key: 'm_id'
      }
    },
    like_vseq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_vocas',
        key: 'v_seq'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_seq" },
        ]
      },
      {
        name: "FK_LVSEQ",
        using: "BTREE",
        fields: [
          { name: "like_vseq" },
        ]
      },
      {
        name: "FK_LMID",
        using: "BTREE",
        fields: [
          { name: "like_user" },
        ]
      },
    ]
  });
  }
}
