const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Users = sequelize.define("users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
 });

module.exports = Users


