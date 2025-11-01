## Quick orientation for AI agents (pwa-course)

This repository is a Playwright-based E2E test suite using a Page Object Model and a few custom fixtures. The goal of these instructions is to help an AI coding assistant be productive quickly and make safe edits.

Highlights
- Tests live under `tests/` (organized by lesson). Page objects are under `page/` (e.g. `page/product/new.product.page.ts`).
- Custom fixtures are in `src/fixture/` (notably `login.fixture.ts` and `test-fixture.ts`) and extend Playwright's `test` with page objects and a `loggedInPage` fixture.
- Test data JSON files live in `tests/lesson-02/data/` (e.g. `data-dev.json`, `data-prod.json`). Environment variables are loaded with `dotenv` via `tests/lesson-02/util.ts`.

What to read first (quick path)
- `playwright.config.ts` — test runner settings and project-level configuration.
- `src/fixture/login.fixture.ts` — shows how `loggedInPage` fixture is constructed and how tests expect a logged-in context.
- `page/product/*.ts` — Page Object implementations (locators, helper methods). These show common patterns used across tests.
- `tests/lesson-02/new-product.spec.ts` and `tests/lesson-02/util.ts` — examples of test usage and env/data loading.

Important patterns & conventions (concrete)
- Page objects commonly return `Locator`s from synchronous methods (e.g. `getLocatorAddNewProductHeading()` returns `this.page.locator(...)`) — tests call `await expect(locator).toHaveText(...)`. Do NOT `await` a `Locator` itself unless the page-object method is `async` and returns a Promise.
- Use Playwright query methods on the `page` object (e.g. `page.getByRole(...)`, `page.getByText(...)`). `getByRole`/`getByText` are not global functions.
- Selectors are mixed: many page objects define `xpath*` string fields and expose locator methods that call `this.page.locator(xpath)`.
- Environment files: the util expects `.env.dev` at repository root; `tests/lesson-02/util.ts` resolves `../../.env.${env}` relative to the util file.

Developer workflows & commands
- Run tests: `npx playwright test` (there are no npm scripts defined in `package.json`).
- Run a single test file: `npx playwright test tests/lesson-02/new-product.spec.ts`.
- Open HTML report: `npx playwright show-report` (the repo contains `playwright-report/`).
- Install deps and browsers: `npm install` then `npx playwright install`.

Common issues to watch for (and examples)
- Syntax / missing braces/semicolons: some TypeScript edits introduced missing `}` or malformed statements — ensure functions/methods are properly closed.
- Wrong use of `getByRole`/`getByText`: call as `page.getByRole(...)` not `getByRole(...)`.
- `expect` usage: pass a `Locator` (or awaited `Promise<Locator>`) to `expect(...)`. Example: `await expect(newProductPage.getLocatorAddNewProductHeading()).toHaveText("Add New Product")`.
- Async getters: do not mark `get` accessors `async`; use `async` methods instead.

Where to change tests vs page objects
- Modify tests for behaviour and orchestration (login flows, step composition). Modify page objects for selector updates, navigation helpers, and to expose locators or small assertion helpers.
- Prefer adding small helper methods on page objects (e.g., `verifyProductPublishedMessage()`) rather than accessing `.page` from tests.

CI / fixtures notes
- `src/fixture/login.fixture.ts` builds a logged-in state and performs cleanup of previous`ly created products. Keep the `use(page)` pattern and fixture scopes (`{ scope: 'test' }`) intact when editing fixtures to preserve isolation.

If you modify code, run these checks locally
1. `npm install` (if package changes)
2. `npx playwright test --project=chromium` or `npx playwright test <file>` for fast feedback
3. `npx playwright show-report` to inspect failures visually

Search locations when you don't know where to look
- `page/`, `tests/`, `src/fixture/`, `tests/lesson-02/data/`.

Questions for the repo owner (please confirm)
- Where are the canonical `.env.*` files stored (root `.env.dev` expected)? If different, should the util loader be updated?
- Preferred pattern for locators: should page object methods return `Locator` (current default) or should they wrap assertions and actions? Current code mixes both.

If this looks good I can expand this with short code snippets for common fixes (e.g., converting an inline `page.getByRole(...)` usage into a page-object getter) — tell me which examples you'd like.
