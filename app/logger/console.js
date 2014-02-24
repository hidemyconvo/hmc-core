var colors = require('colors');

var theme = {
    trace: 'cyan',
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
};
colors.setTheme(theme);

function makeLevel(level) {
    return function () {
        console[level](Array.prototype.slice.call(arguments, 0).join(' ')[level]);
    }
}

var logger = {};
Object.keys(theme).forEach(function (lvl) {
    logger[lvl] = makeLevel(lvl);
});

module.exports = logger;
