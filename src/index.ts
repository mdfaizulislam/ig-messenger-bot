import express, { Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const botControllerRouter = require('./controllers/botController');

const app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use(express.static('./public'));

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
    next: Function
) => {
    console.log('something went wrong');
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});
