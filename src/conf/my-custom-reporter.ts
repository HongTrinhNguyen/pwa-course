import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter"
import { loadEnvInfo } from "../util/util";
import SlackReporter from "./slack-reporter";
import DiscordReport from "./discord-reporter";
import TelegramReporter from "./telegram-reporter";
import { config } from "dotenv";
import { suite } from "node:test";
import { report } from "process";

export default class MyCustomReporter implements Reporter {   
    private reporter: Reporter[] = [];
    constructor(){
        const {reportSlack, reportDiscord,reportTele } = loadEnvInfo(process.env.ENV);
        console.log(`Slack: ${reportSlack}`);
        console.log(`Discord: ${reportDiscord}`);
        console.log(`Telegram: ${reportTele}`);
        
        if(reportSlack === true) {
            this.reporter.push(new SlackReporter());
        }
        if(reportDiscord === true) {
            this.reporter.push(new DiscordReport());
        }
        if(reportTele === true) {
            this.reporter.push(new TelegramReporter());
        }
        console.log("list report value boolean: ", report);
    }

    async onBegin(config: FullConfig, suite: Suite){
        for (const report of this.reporter){
            if (report.onBegin)
                report.onBegin(config,suite);
        }
    }

    async onTestBegin(test: TestCase, result: TestResult) {
        for (const report of this.reporter){
            if (report.onTestBegin)
                report.onTestBegin(test,result);
        }
    }

    async onTestEnd(test: TestCase, result: TestResult) {
        for (const report of this.reporter){
            if (report.onTestEnd){
                report.onTestEnd(test, result);
            }
        }
    }

    async onEnd(result: FullResult) {
        for (const report of this.reporter) {
            if (report.onEnd) {
                await report.onEnd(result);
            }                
        }          
    }    
}
