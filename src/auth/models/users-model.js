'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    }
    throw new Error('Invalid Login');
  };

  return User;
};
