var fmt = require('rssi');

var VERSION = 1;

var isProduction = process.env.NODE_ENV == 'production',
    reqChain = isProduction ? [checkForXhr] : [],
    routeFormat = fmt('/api/v#{ver}/#{route}');

function checkForXhr(req, res, next) {
    if (req.xhr) return next();
    res.status(400).send('Only XHR is allowed');
}

function Api(app) {
    this.app = app;
}

'get post put delete'.split(' ').forEach(function (method) {
    Api.prototype[method] = function (route, fn) {
        this.app[method](routeFormat({ver: VERSION, route: route}), reqChain, fn);
    }
});

module.exports = Api;
