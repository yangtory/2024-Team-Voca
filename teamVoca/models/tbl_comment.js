import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_comment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    c_seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    c_user: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'tbl_members',
        key: 'm_id'
      }
    },
    c_vseq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_vocas',
        key: 'v_seq'
      }
    },
    c_comment: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "c_seq" },
        ]
      },
      {
        name: "FK_CMID",
        using: "BTREE",
        fields: [
          { name: "c_user" },
        ]
      },
      {
        name: "FK_CSEQ",
        using: "BTREE",
        fields: [
          { name: "c_vseq" },
        ]
      },
    ]
  });
  }
}
