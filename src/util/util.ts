import dotenv from 'dotenv';
import path from 'path';

export function loadEnvInfo(env: string) {
    delete process.env.BASE_URL_ADMIN;
    delete process.env.USERNAME;
    delete process.env.PASSWORD;
    delete process.env.INVALID_PASSWORD;
    delete process.env.CHATID_TELE;
    dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });

    // Login info
    const baseUrl = process.env.BASE_URL_ADMIN;
    const validUsername = process.env.USERNAME;
    const invalidUsername = process.env.INVALID_USERNAME;
    const password = process.env.PASSWORD;

    //Webhooks
    const webhookDiscord = process.env.WEBHOOK_DISCORD;
    const webhookSlack = process.env.WEBHOOK_SLACK;
    const webhookTele = process.env.WEBHOOK_TELE;
    const chatIdTele = process.env.CHATID_TELE;

    // Channels
    const reportSlack = process.env.REPORT_SLACK === 'true';
    const reportDiscord = process.env.REPORT_DISCORD === 'true';
    const reportTele = process.env.REPORT_TELE === 'true';

    return {
        baseUrl,
        validUsername,
        invalidUsername,
        password,

        webhookDiscord,
        webhookSlack,
        webhookTele,
        chatIdTele,

        reportSlack,
        reportDiscord,
        reportTele
    };
};
