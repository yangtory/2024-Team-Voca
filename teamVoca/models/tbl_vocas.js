import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_vocas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    v_seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    v_mid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'tbl_members',
        key: 'm_id'
      }
    },
    v_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    v_public: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    v_rec: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_vocas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "v_seq" },
        ]
      },
      {
        name: "FK_VMID",
        using: "BTREE",
        fields: [
          { name: "v_mid" },
        ]
      },
    ]
  });
  }
}
