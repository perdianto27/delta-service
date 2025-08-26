const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Product = require("./Product")(sequelize, Sequelize.DataTypes);
const Category = require("./Category")(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Product,
  Category
};