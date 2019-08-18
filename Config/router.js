const app = require('./app');

const authRouter = require('../Router/auth');

const apiPrefix = 'api/v1';

app.use(`${apiPrefix}/auth`, authRouter);