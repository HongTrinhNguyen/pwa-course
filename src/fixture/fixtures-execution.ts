import { test as base, expect, Browser, Page, BrowserContext, WorkerInfo } from "@playwright/test";

type WorkerFixtures = {
    autoMockServer: void;
    userCredentials: string;
};

type TestFixtures = {
    loggedInPage: Page;
    autoLogAPI: void;
}

const test = base.extend<TestFixtures, WorkerFixtures>({
    autoMockServer: [
        async ({ }, use, workerInfo) => {
            console.log('Setup step for autoMockServer');
            await use();
            console.log('Teardown for autoMockServer');
        },
        { scope: "worker", auto: true },
    ],

    userCredentials: [async ({ browser }, use, workerInfo) => {
        console.log(`Setup for userCredentials - ${workerInfo.workerIndex}`);
        const credentials = `user - ${workerInfo.workerIndex}-credentials`
        await use(credentials);
        console.log(`Tear down for userCredentials  ${workerInfo.workerIndex}`)
    },
        { scope: "worker" },
    ],

    loggedInPage: [
        async ({ browser, userCredentials }, use, testInfo) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            console.log(`Setup Login - ${userCredentials}`);
            await use(page);
            await context.close();
            console.log(`Teardown Login - ${userCredentials}`);
        },
        { scope: "test" },
    ],

    autoLogAPI: [
        async ({ }, use, testInfo) => {
            console.log(`Set up for API`)
            await use();
            console.log(`Teardown for API`)
        },
        { scope: "test", auto: true },
    ],
});

export { test, expect };