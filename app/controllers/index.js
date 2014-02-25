function index(req, res) {
    res.send('hmc-core: Work!');
}

module.exports = function (app) {
    app.get('/', index);
}
