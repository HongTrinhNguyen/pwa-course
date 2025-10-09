import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

export function loadEnvInfo(env: string) {
    delete process.env.BASE_URL_ADMIN;
    delete process.env.USERNAME;
    delete process.env.PASSWORD;
    delete process.env.INVALID_PASSWORD;
    dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
    // const envTest = process.env.ENV || 'dev';
    
    // const envPath = path.resolve(__dirname, `../../.env.${env}`);
    // console.log("Resolved path:", envPath);
    
    
    const baseUrl = process.env.BASE_URL_ADMIN;
    const validUsername = process.env.USERNAME;
    const invalidUsername = process.env.INVALID_USERNAME;
    const password = process.env.PASSWORD;

    // console.log("✅ BASE_URL_ADMIN =", baseUrl);
    // console.log("✅ USERNAME =", validUsername);

    return { baseUrl, validUsername, invalidUsername, password };
}
