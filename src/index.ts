import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser, { json } from 'body-parser';
import { Config } from './configs/config';
const botControllerRouter = require('./controllers/botController');

const app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

// Parse application/json. Verify that callback came from Facebook
// app.use(json({ verify: Utils.verifyRequestSignature }));

app.use(express.static('./public'));

// Set template engine in Express
// app.set("view engine", "ejs");

// application routes
app.use('/webhook', botControllerRouter);

app.all('*', function (req, res) {
    throw new Error('Bad request');
});

// default error handler
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('something went wrong');
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};

app.use(errorHandler);

// Check all Configs
Config.checkEnvVariables();

app.listen(Config.port, () => {
    console.log(`App is running at the port ${Config.port}`);
});
