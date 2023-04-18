import express from "express";
import bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const botController = require("./controllers/botController");

let app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'))

// application routes
app.use("/webhook", botController);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});