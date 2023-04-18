import { Request, Response } from 'express';
import express from 'express';
import { Config } from '../configs/config';
import { Utils } from '../utils/Utils';
const botControllerRouter = express.Router();

function processWebHookPostMethod(req: Request, res: Response) {
    // res.status(200).send({ message: 'Hello from post method!' });

    console.log('Received webhook:');
    let body = req.body;
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach((entry: any) => {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            let times_tamp = webhook_event.timestamp;
            console.log('Times Tamp: ' + times_tamp);

            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            // Get the sender PSID
            //--------GamePlay-----------
            if (webhook_event.game_play) {
                let game_id = webhook_event.game_play.game_id;

                let userTime = Math.round(times_tamp / 1000 / 60) * 1000 * 60;

                Utils.SendMessage(sender_psid);

                setTimeout(() => {
                    Utils.SendMessage(sender_psid);
                }, 2000 * 60);
                setTimeout(() => {
                    Utils.SendMessage(sender_psid);
                }, 5000 * 60);
                setTimeout(() => {
                    Utils.SendMessage(sender_psid);
                }, 70000 * 60);
                setTimeout(() => {
                    Utils.SendMessage(sender_psid);
                }, 10000 * 60);
            }
            //---------------------GmaePlay End---------------
            else if (webhook_event.message) {
                //      console.log("Message");
            } else {
                //       console.log("no Message and no game");
            }
        });
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
}

function processWebHookGetMethod(req: Request, res: Response) {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === 'subscribe' && token === Config.verifyToken) {
            // Respond with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(404);
    }
}

botControllerRouter
    .post('/', processWebHookPostMethod)
    .get('/', processWebHookGetMethod);

module.exports = botControllerRouter;
