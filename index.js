// Prepare configuration
var nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: './config.json'});

// Initialize logger
var logger  = require('./app/logger');
logger.info(JSON.stringify(nconf.get('mongo')));

require('./app');
