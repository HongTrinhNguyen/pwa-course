import { test, expect } from "../../src/fixture/fixtures-execution"

test.describe("Execute order", () => {
    test.beforeAll(async ()=> {
        console.log('Run beforeall below test decribe');
    });

    test.beforeEach(async () => {
        console.log('Run beforEach below test decribe');
    });

    test.afterEach(async () => {
        console.log('Run afterEach below test decribe');
    });

    test.afterAll(async () => {
        console.log('Run afterAll below test decribe and afterEach');
    });

    test("1ST TEST - Check fixture apply", async({page}) => {

        await test.step("Step 1", async () => {
            console.log('Running step 01');
        });

        await test.step("Step 2", async () => {
            console.log('Running step 02');
        });
    });

    test('2ND TEST - Check LOGGEDINPAGE apply', async({loggedInPage}) => {

        await test.step("Step 1", async () => {
            console.log('Running step 01 of 2nd');
        });

        await test.step("Step 2", async () => {
            console.log('Running step 02 of 2nd');
        });
    });
});