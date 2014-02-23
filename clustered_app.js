var cluster = require('cluster');

cluster.setupMaster({
    exec: 'index.js'
});

cluster.on('exit', function (worker) {
    cluster.fork();
});

var cpuCount = require('os').cpus().length;
for (var i = 0; i < cpuCount; ++i) {
    cluster.fork();
}
