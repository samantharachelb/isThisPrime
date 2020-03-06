import express from 'express';
import limit from 'express-rate-limit';
import log from './log';
import isPrime from './prime';

let app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Authorization, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.set('trust proxy', 1);

app.use(
    limit({
        message: {status: 429, message: "calm down there you big shot 10x developer"},
        windowMs: 15 * 60 * 1000, // 15 minute window
        max: 1000, // limit each IP to 1000 requests per windowMs
    })
);

app.get('/*', (req, res) => {
    const input = decodeURI(req.originalUrl.substr(1)).trim();

    isPrime(input)
        .then(state => {
            res.json({status: 200, input, state})
        })
        .catch(e => res.status(e.status || 400).send(e));
});

app.listen(3002, () => log.info('available at http://localhost:3002'));