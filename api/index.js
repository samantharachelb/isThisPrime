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

    if (!input.match(/^\d+$/)) {
        return res.json({
            status: 400,
            message: "That's not a number."
        })
    } else if (input.length > 17) {
        return res.json({
            status: 413,
            message: "You've entered /way/ too many numbers"
        });
    } else if (input > Number.MAX_SAFE_INTEGER) {
        return res.json({
            status: 413,
            message: "Integers shouldn't be larger than the MAX_SAFE_INTEGER"
        })
    } else if (input < Number.MIN_SAFE_INTEGER) {
        return res.json({
            status: 413,
            message: "The number shouldn't be smaller than the MIN_SAFE_INTEGER"
        })
    }
    
    isPrime(input)
        .then(state => {
            res.json({status: 200, input, state})
        })
        .catch(e => res.status(e.status || 400).send(e));
});

app.listen(3002, () => log.info('available at http://localhost:3002'));