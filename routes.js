const routes = require('next-routes')();

routes
    .add('/crowdfund/new', '/crowdfund/new')
    .add('/crowdfund/:address', '/crowdfund/show');

module.exports = routes;