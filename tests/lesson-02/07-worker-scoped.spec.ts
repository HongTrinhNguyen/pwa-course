import { test, expect } from "../../src/fixture/account.fixture";

test.describe("Creating fixture variants homework", async () => {
    test("Test 1", async ({account}) => {
        console.log(`Test 1 - ${account}`);
        expect(account).toContain("customer-");
    })

    test("Test 2", async ({account}) => {
        console.log(`Test 2 - ${account}`);
        expect(account).toContain("customer-");
    })

    test("Test 3", async ({account}) => {
        console.log(`Test 3 - ${account}`);
        expect(account).toContain("customer-");
    });
});