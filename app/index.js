var nconf   = require('nconf'),
    logger  = require('./logger'),
    http    = require('http'),
    express = require('express'),
    path    = require('path'),
    fs      = require('fs');

logger.info('Starting up application');

// Configure express instance
var app = express(),
    env = process.env.NODE_ENV || 'development';
app.configure(function () {
    app.set('addr', nconf.get('app:bindAdrress') || '127.0.0.1');
    app.set('port', nconf.get('app:bindPort') || 3000);
    app.disable('x-powered-by');
    app.enable('trust proxy');
    app.use(express.favicon());
    if (env == 'development') {
        app.use(express.logger({
            format: 'dev',
            stream: {
                write: function (msg, encoding) {
                    logger.info(msg);
                }
            }
        }));
        app.use(express.errorHandler({
            dumpException: true,
            showStack: true
        }));
    }
    app.use(express.limit('1mb'));
    app.use(express.json());
    app.use(express.urlencoded({limit: '1.5mb'}));
    app.use(express.multipart({limit: '1.5mb'}));
    app.use(express.methodOverride());
    app.use(app.router);
});

// Bootstrap controllers
var controllersPath = path.join(__dirname, 'controllers');
fs.readdirSync(controllersPath).forEach(function (file) {
    if (file.indexOf('.js') != -1) require(path.join(controllersPath, file))(app);
});

http.createServer(app).listen(app.get('port'), app.get('addr'), function () {
    logger.info('✔ Express server listening on ' + app.get('addr') + ':' + app.get('port'));
});
