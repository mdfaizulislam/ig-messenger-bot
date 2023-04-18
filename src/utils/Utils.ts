import { Request, Response } from 'express';
import request from 'request';
import { Config } from '../configs/config';
import crypto from 'crypto';

export class Utils {
    // Verify that the callback came from Facebook.
    public static verifyRequestSignature(
        req: Request,
        res: Response,
        buf: any
    ) {
        let signature: string = req.headers['x-hub-signature'] as string;
        console.log('Signature: ' + signature);
        if (!signature) {
            console.warn(`Couldn't find "x-hub-signature" in headers.`);
        } else {
            console.warn(`Found "x-hub-signature" in headers.`);
            let elements = signature.split('=');
            let signatureHash = elements[1];
            let expectedHash = crypto
                .createHmac('sha1', Config.appSecret)
                .update(buf)
                .digest('hex');
            if (signatureHash != expectedHash) {
                throw new Error("Couldn't validate the request signature.");
            }
        }
    }

    public static SendMessage(sender_psid: any) {
        let response = {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: [
                        {
                            title: Config.msgTitle,
                            image_url: Config.msgPhotoUrl,
                            subtitle: Config.msgSubTitle,
                            default_action: {
                                type: 'game_play'
                            },
                            buttons: [
                                {
                                    type: 'game_play',
                                    title: Config.msgButtleTitle,
                                    payload: JSON.stringify({
                                        bot_data: 0
                                    })
                                }
                            ]
                        }
                    ]
                }
            }
        };

        Utils.callGraphSendAPI(sender_psid, response);
    }

    public static callGraphSendAPI(sender_psid: any, response: any) {
        // Construct the message body
        let request_body = {
            recipient: {
                id: sender_psid
            },
            message: response
        };

        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: `${Config.apiUrl}/me/messages`,
                // uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: Config.pageAccesToken },
                method: 'POST',
                json: request_body
            },
            (err, res, body) => {
                if (!err) {
                    console.log('message sent!  Id: ' + sender_psid);
                } else {
                    console.error('Unable to send message:' + err);
                }
            }
        );
    }
}
