'use strict';

const base64 = require('base-64');
const Users = require('../models/users-model.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.authenticateBasic(username, password);
    req.user = user;
    next();
  } catch (error) {
    next('Invalid Login');
  }
};
