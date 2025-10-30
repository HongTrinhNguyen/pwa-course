import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter"
import { loadEnvInfo } from "../util/util";

export default class DiscordReporter implements Reporter {
    
    totalTest: number = 0; // Tong so test trong suite
    // Luu so test theo status result
    totalPassed: number = 0;
    totalFailed: number = 0;
    totalSkipped: number = 0;
    totalTimeOut: number = 0;
    totalInterrupt: number = 0;

    // Luu danh sach cac test theo status result (title + duration)
    passedCase: string[] = [];
    failedCase: string[] = [];
    skippedCase: string[] = [];
    timeOutCase: string[] = [];
    interruptCase: string[] = [];

    content: string[] = []; // Luu cac dong report cuoi cung

    async onBegin(config: FullConfig, suite: Suite): Promise<void> {
        this.totalTest = suite.allTests().length;
    }

    onTestBegin(test: TestCase, result: TestResult): void {

    }

    onTestEnd(test: TestCase, result: TestResult): void {
        switch (result.status) {
            case "passed":
                this.totalPassed++;
                this.passedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "failed":
                this.totalFailed++;
                this.failedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "timedOut":
                this.totalTimeOut++;
                this.timeOutCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "skipped":
                this.totalSkipped++;
                this.skippedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "interrupted":
                this.totalInterrupt++;
                this.interruptCase.push(`${test.title} (${result.duration / 1000})`);
                break;
        }
    }

    async onEnd(result: FullResult): Promise<void | { status?: FullResult["status"] } | undefined> {
        const reportingTime = new Date(Date.now()).toLocaleString();
        this.content.push(`Reporting time: ${reportingTime}`);
        this.content.push(`- Total tests: ${this.totalTest}`);
        this.content.push(`- Passed tests ${this.totalPassed}/${this.totalTest} (${((this.totalPassed / this.totalTest) * 100).toFixed(2)} %)`);
        this.content.push(`- Failed tests ${this.totalFailed}/${this.totalTest} (${((this.totalFailed / this.totalTest) * 100).toFixed(2)} %)`);
        for (let i = 0; i < this.failedCase.length; i++) {
            this.content.push(`   - ${this.failedCase[i]}`);
        }

        this.content.push(`- Timeout tests: ${this.totalTimeOut}/${this.totalTest} (${((this.totalTimeOut / this.totalTest) * 100).toFixed(2)} %)`);
        for (let i = 0; i < this.timeOutCase.length; i++) {
            this.content.push(`   - ${this.timeOutCase[i]}`);
        }
        
        const {webhookDiscord, webhookSlack, webhookTele, chatIdTele} = loadEnvInfo(process.env.ENV);
        console.log(this.content.join("\n"));
        const bodyDiscord = {
            "content": this.content.join("\n"),
        }

        const bodyStrDiscord = JSON.stringify(bodyDiscord);  
        const responseDiscord = await fetch(webhookDiscord, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyStrDiscord
        });
    }
}