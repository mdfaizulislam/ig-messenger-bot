// Use dotenv to read .env vars into Node
import { Console } from 'console';
import dotenv from 'dotenv';
dotenv.config();

// Required environment variables
const ENV_VARS = [
    'PAGE_ID',
    'APP_ID',
    'PAGE_ACCESS_TOKEN',
    'APP_SECRET',
    'VERIFY_TOKEN',
    'PORT',
    // generic info
    'MSG_TITLE',
    'MSG_SUBTITLE',
    'MSG_BUTTON_TITLE',
    'MSG_PHOTO_URL'
];

export class Config {
    public static apiDomain: string = 'https://graph.facebook.com';
    public static apiVersion: string = 'v11.0';
    // Page and Application information
    public static pageId: string = process.env.PAGE_ID || '';
    public static appId: string = process.env.APP_ID || '';
    public static pageAccesToken: string = process.env.PAGE_ACCESS_TOKEN || '';
    public static appSecret: string = process.env.APP_SECRET || '';
    public static verifyToken: string = process.env.VERIFY_TOKEN || '';

    // Preferred port (default to 8080)
    public static port: number = Number(process.env.PORT) || 8080;

    public static msgTitle: string = process.env.MSG_TITLE || '';
    public static msgSubTitle: string = process.env.MSG_SUBTITLE || '';
    public static msgButtleTitle: string = process.env.MSG_BUTTON_TITLE || '';
    public static msgPhotoUrl: string = process.env.MSG_PHOTO_URL || '';

    // Base URL for Messenger Platform API calls
    public static get apiUrl() {
        return `${this.apiDomain}/${this.apiVersion}`;
    }

    public static checkEnvVariables(): void {
        ENV_VARS.forEach((key) => {
            if (!process.env[key] || process.env[key] == '') {
                console.warn(
                    'WARNING: Missing the environment variable ' + key
                );
            }
        });
    }
}
