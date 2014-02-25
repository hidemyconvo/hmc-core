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
    var api = new (require('./utils/api'))(app);
    api.get('users', getUsers)
    api.post('users', createUser);
    api.put('users/:id', updateUser);
}
