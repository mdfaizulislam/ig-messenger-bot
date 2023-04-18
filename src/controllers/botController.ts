import { Request, Response } from "express";
import express from "express"
import bodyParser = require("body-parser");
import request from "request";
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

function processWebHookPostMethod(req: Request, res: Response) {
    res.status(200).send({ message: "Hello from post method!" });
}

function processWebHookGetMethod(req: Request, res: Response) {
    res.status(200).send({ message: "Hello from get method!" });
}

router.post("/", processWebHookPostMethod)
    .get("/", processWebHookGetMethod);

module.exports = router;