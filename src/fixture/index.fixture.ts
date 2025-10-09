import {test as t1} from "./login.fixture";
import { test as t2} from "./login-1.fixture"
import {  mergeTests } from "@playwright/test";

export const test = mergeTests(t1, t2);