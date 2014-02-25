var mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    when        = require('when');

exports.findAll = function () {
    var deferred = when.defer();
    User.find(function (err, users) {
        if (err) return deferred.reject(err);
        deferred.resolve(users);
    });
    return deferred.promise;
}
