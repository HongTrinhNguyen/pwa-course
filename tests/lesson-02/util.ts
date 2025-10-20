import dotenv from 'dotenv';
import path from 'path';

export function loadEnvInfo(env: string) {
    delete process.env.BASE_URL_ADMIN;
    delete process.env.USERNAME;
    delete process.env.PASSWORD;
    delete process.env.INVALID_PASSWORD;
    delete process.env.API_URL;
    delete process.env.API_KEY;
    dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
    
    const baseUrl = process.env.BASE_URL_ADMIN;
    const validUsername = process.env.USERNAME;
    const invalidUsername = process.env.INVALID_USERNAME;
    const password = process.env.PASSWORD;
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    return { baseUrl, validUsername, invalidUsername, password, apiUrl, apiKey };
}
