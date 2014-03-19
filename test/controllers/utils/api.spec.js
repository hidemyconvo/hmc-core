var baseDir = process.cwd();

var helpers = require(baseDir + '/test/helpers');

describe('API prefix path helper', function () {

    it('Should be correct API prefixes', function (done) {
        var app = helpers.createExpressMock();

        var api = new (require(baseDir + '/app/controllers/utils/api'))(app);
        api.get('users', helpers.noop);
        api.post('users', helpers.noop);
        api.put('users/:id', helpers.noop);
        api.delete('users/:id', helpers.noop);

        expect(app.routes.get[0]).toBe('/api/v1/users');
        expect(app.routes.post[0]).toBe('/api/v1/users');
        expect(app.routes.put[0]).toBe('/api/v1/users/:id');
        expect(app.routes.delete[0]).toBe('/api/v1/users/:id');

        done();
    });

});
