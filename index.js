'use strict';

// I think I need to import more in the index.js file if it's not beeing called in the server.js file but I'm kind of lost

require('dotenv').config();
const server = require('./src/server.js');
const { sequelize } = require('./src/auth/models/index.js');

sequelize.sync()
  .then(() => {
    server.start(process.env.PORT || 3002);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
