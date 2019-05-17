import * as express from 'express';
import * as logger from 'morgan';
import { router } from './router';

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(logger('tiny'));

app.use('/', router);

(async () => {
    const port = process.env.PORT || 12180;
    // await createConnection();
    app.listen(port);
    console.log('Listening on port', port);
})().catch(e => console.error(e.stack));
