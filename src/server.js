'use strict';

const express = require('express');
const app = express();
const authRouter = require('./auth/router');
const PORT = process.env.PORT || 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRouter);

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`);
    });
  },
};
