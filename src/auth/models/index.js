'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./users-model.js');

const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
const sequelize = new Sequelize(SQL_URL);

const User = UserModel(sequelize, DataTypes);

module.exports = {
  sequelize: sequelize,
  User: User
};
