import {test as base,expect, WorkerInfo} from "@playwright/test";

type WorkerFixtures = {
    account: string;
}

const test = base.extend<{}, WorkerFixtures>({
    account: [
        async({}, use, WorkerInfo) => {
            const account =`customer-${WorkerInfo.workerIndex}`;
            console.log(account);

            await use(account);

        },
        { scope: "worker" },
    ],
});

export { test, expect };