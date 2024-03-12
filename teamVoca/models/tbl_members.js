import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class tbl_members extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        m_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        m_pw: {
          type: DataTypes.STRING(125),
          allowNull: false,
        },
        m_nick: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        m_image: {
          type: DataTypes.STRING(225),
          allowNull: true,
        },
        m_role: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        m_pro: {
          type: DataTypes.STRING(5),
          allowNull: true,
        },
        m_tuto: {
          type: DataTypes.STRING(5),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_members",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "m_id" }],
          },
        ],
      }
    );
  }
}
