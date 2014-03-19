exports.createExpressMock = function () {
    return new ExpressMock();
}

exports.noop = function () {}

function ExpressMock() {
    this.routes = {};
}

'get post put delete'.split(' ').forEach(function (method) {
    ExpressMock.prototype[method] = function (route) {
        this.routes[method] = this.routes[method] || [];
        this.routes[method].push(route);
    }
});
