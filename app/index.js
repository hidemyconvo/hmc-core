var nconf   = require('nconf'),
    logger  = require('./logger'),
    http    = require('http'),
    express = require('express');

logger.info('Starting up application');

var app = express(),
    env = process.env.NODE_ENV || 'development';
app.configure(function () {
    app.set('addr', nconf.get('app:bindAdrress') || '127.0.0.1');
    app.set('port', nconf.get('app:bindPort') || 3000);
    app.disable('x-powered-by');
    app.enable('trust proxy');
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

require('./routes')(app);

http.createServer(app).listen(app.get('port'), app.get('addr'), function () {
    logger.info('✔ Express server listening on ' + app.get('addr') + ':' + app.get('port'));
});
