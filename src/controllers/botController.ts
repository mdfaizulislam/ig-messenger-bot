import { Request, Response } from 'express';
import express from 'express';
import bodyParser = require('body-parser');
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();
const botControllerRouter = express.Router();

function processWebHookPostMethod(req: Request, res: Response) {
    res.status(200).send({ message: 'Hello from post method!' });
}

function processWebHookGetMethod(req: Request, res: Response) {
    res.status(200).send({ message: 'Hello from get method!' });
}

botControllerRouter
    .post('/', processWebHookPostMethod)
    .get('/', processWebHookGetMethod);

module.exports = botControllerRouter;
