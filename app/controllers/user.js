var userService = require('../services/user');

function getUsers(req, res) {
    userService.findAll().then(function (users) {
        res.jsonp(users);
    }, handleError.bind(res));
}

function createUser(req, res) {
    // TODO:
    res.jsonp({});
}

function updateUser(req, res) {
    // TODO:
    res.jsonp({});
}

function handleError(err) {
    this.status(500).jsonp({error: err.message});
}

module.exports = function (app) {
    app.get('/api/v1/users', getUsers)
    app.post('/api/v1/users', createUser);
    app.put('/api/v1/users/:id', updateUser);
}
