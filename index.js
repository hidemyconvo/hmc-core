// Prepare configuration
var nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: './config.json'});

// Initialize logger
var logger  = require('./app/logger');

// Bootstrap db connection
var mongoose    = require('mongoose'),
    path        = require('path'),
    fs          = require('fs');

var connectToDatabase = function () {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            },
            poolSize: nconf.get('mongo:poolSize') || 5
        }
    };
    mongoose.connect(nconf.get('mongo:uri') + nconf.get('mongo:db'), options);
}
connectToDatabase();

mongoose.connection.on('disconnected', function () {
    connectToDatabase();
})
mongoose.connection.on('error', function (err) {
    logger.error('✗ MongoDB connection error -', err);
    process.exit(1);
});

// Bootstrap models
var modelsPath = path.join(__dirname, 'app', 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') != -1) require(path.join(modelsPath, file));
})

// Startup application
require('./app');
