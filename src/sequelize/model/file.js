import sequelize from "sequelize";
import sequelizeInstance from "../index.js";

const File = sequelizeInstance.define(
  "file",
  {
    id: {
      type: sequelize.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "name",
    },
    data: {
      type: sequelize.TEXT(),
      allowNull: true,
      field: "data",
    },
    createdAt: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "created_at",
    },
  },
  {
    tableName: "file",
  }
);

export default File;
