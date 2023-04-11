'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic.js');
const Users = require('./models/users-model.js');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error.message);
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
