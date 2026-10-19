# Playwright Automation Framework

JavaScript end-to-end test automation for the [AutomationExercise practice website](https://www.automationexercise.com).
The framework uses Playwright Test to verify user-facing shopping workflows in Chromium and the site's REST API.

## What this project covers

- **UI automation:** account registration and login, product browsing and search, categories and brands, reviews,
  cart operations, checkout and payment, subscriptions, contact form submission and file upload, navigation, and
  invoice download.
- **API automation:** product and brand listings, product search, login verification, and account creation, lookup,
  updates, and deletion. Tests check HTTP responses as well as the API's response codes and payloads.
- **Reusable test code:** page objects encapsulate browser interactions; API client and service classes organize
  HTTP requests; a Playwright fixture creates and disposes API request contexts; checkout helpers share common
  workflows.
- **Failure diagnostics:** Playwright produces an HTML report and retains screenshots, video, and traces for failed
  tests.
- **Quality and CI:** ESLint, Prettier, dependency auditing, and GitHub Actions workflows for quality, API tests,
  UI smoke tests, and scheduled or manually dispatched regression runs.

This suite tests the live public practice website by default; it is not an application server or a mock environment.
UI and account API tests can create or delete test accounts and place demo orders. Run against a target where you are
authorized to perform these actions.

## Requirements

- Node.js **24.x** (the package requires `>=24 <25`)
- npm
- Chromium, installed through Playwright

## Getting started

```bash
git clone <repository-url>
cd playwright-automation-framework
npm ci
npx playwright install chromium
```

Create a local environment file from the provided template:

```bash
cp .env.example .env
```

Set the following values in `.env`:

| Variable             | Default                                                    | Purpose                                                                                                      |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `BASE_URL`           | `https://www.automationexercise.com`                       | Base URL for browser tests                                                                                   |
| `API_BASE_URL`       | `BASE_URL`, otherwise `https://www.automationexercise.com` | Base URL for API tests                                                                                       |
| `API_TIMEOUT`        | `15000`                                                    | API request timeout in milliseconds                                                                          |
| `TEST_USER_EMAIL`    | None                                                       | Email for tests that log in to an existing account, check duplicate registration, or submit the contact form |
| `TEST_USER_PASSWORD` | None                                                       | Password for tests that log in to an existing account                                                        |

For the credential-dependent tests, use a valid account on the configured target. The account should already exist;
the registration tests create unique accounts independently. Do not commit `.env` or real credentials. For CI, set
`TEST_USER_EMAIL` and `TEST_USER_PASSWORD` as repository secrets.

Example:

```dotenv
BASE_URL=https://www.automationexercise.com
API_BASE_URL=https://www.automationexercise.com
API_TIMEOUT=15000
TEST_USER_EMAIL=your-test-account@example.com
TEST_USER_PASSWORD=your-test-password
```

## Running tests

| Command                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| `npm test`                | Run all Playwright tests                     |
| `npm run test:all`        | Run the complete test suite                  |
| `npm run test:ui`         | Run UI tests tagged `@ui`                    |
| `npm run test:api`        | Run API tests tagged `@api`                  |
| `npm run test:ui:smoke`   | Run UI tests tagged `@smoke`                 |
| `npm run test:regression` | Run tests tagged `@regression`               |
| `npm run test:report`     | Open the most recently generated HTML report |

Useful Playwright CLI options can be appended to the test command, for example:

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --grep @smoke
npx playwright test tests/ui/checkout.spec.js
```

The project currently runs against Desktop Chrome/Chromium. UI and API tests can be run separately; ensure Chromium
is installed before running UI tests locally.

## Reports and troubleshooting

After a run, Playwright writes:

- `playwright-report/` — HTML report; open it with `npm run test:report`.
- `test-results/` — test artifacts, including failure screenshots, retained videos, and traces.

The directories are generated output and are excluded from version control. In GitHub Actions, reports and test
results are uploaded as workflow artifacts even when a test job fails. Use the trace artifact to inspect the steps,
network activity, and browser state around a failure.

## Project structure

```text
.
├── api/
│   ├── clients/             # Shared Playwright API request wrapper
│   └── services/            # Product, authentication, and account endpoints
├── config/                  # API base URL and timeout configuration
├── fixtures/                # API test fixture and contact upload fixture
├── pages/                   # UI page objects
├── tests/
│   ├── api/                 # API endpoint tests
│   └── ui/                  # Browser-based UI scenarios
├── utils/                   # Shared workflow helpers
├── playwright.config.js     # Playwright projects, timeouts, reporters, and browser settings
└── eslint.config.js         # JavaScript and Playwright lint rules
```

### Test design

- UI tests use page objects in `pages/` to keep selectors and user actions reusable.
- API tests use the `api` fixture from `fixtures/api.fixture.js`, which provides `client`, `products`, `auth`, and
  `accounts` services and disposes of its request context after the test.
- Test names use `@ui` or `@api` tags and may also carry `@smoke` or `@regression` tags for selection.
- Account-focused API tests create unique accounts and remove them after use.

## Code quality

```bash
npm run lint
npm run format:check
npm run quality
npm run quality:ci
```

`quality:ci` runs linting, formatting checks, and `npm audit --audit-level=high`. `npm run lint:fix` and `npm run
format` apply the available automatic fixes.

## Continuous integration

GitHub Actions runs quality checks and API tests on pushes and pull requests targeting `master`, and runs UI smoke
tests after quality checks. A full regression run is also configured for manual dispatch and the weekly schedule.
The separate quality workflow checks pushes to `main` and `master` and all pull requests. The workflows use Node.js
24; UI and full-regression jobs install Chromium.

## Contributing

Keep tests isolated, use unique data for scenarios that create records, and avoid hard-coding credentials. Run the
relevant test command and `npm run quality` before submitting changes. Commit messages are checked against the
Conventional Commits standard.
