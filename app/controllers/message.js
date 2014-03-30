var messageService = require('../services/message');

function getThreadMessages(req, res) {
    res.jsonp({});
}

function createMessage(req, res) {
    res.jsonp({});
}

function updateMessage() {
    res.jsonp({});
}

module.exports = function(app) {
    var api = new (require('./utils/api'))(app);
    api.get('messages', getThreadMessages);
    api.post('messages', createMessage);
    api.put('messages/:id', updateMessage);
}
