import { loadEnvInfo } from "./util";

export async function sendReport(message: string, env: string){
    const {webhookDiscord, webhookSlack, webhookTele, chatIdTele} = loadEnvInfo(env);
    const reportChannel = process.env
}