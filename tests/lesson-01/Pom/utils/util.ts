import dotenv from 'dotenv';
import path from 'path';

export function loadEnvInfo(env: string) {
    delete process.env.BASE_URL_ADMIN;
    delete process.env.USERNAME;
    delete process.env.PASSWORD;
    delete process.env.INVALID_PASSWORD;
    dotenv.config({ path: path.resolve(__dirname, `../../../../.env.${env}`) });
    const baseUrl = process.env.BASE_URL_ADMIN;
    const validUsername = process.env.USERNAME;
    const invalidUsername = process.env.INVALID_USERNAME;
    const password = process.env.PASSWORD;

    return { baseUrl, validUsername, invalidUsername, password };
}
