---
title: Statsig To Wingify
excerpt: >-
  Migrate your Statsig gates, configs, and experiments to Wingify Feature
  Experimentation.
deprecated: false
hidden: true
metadata:
  robots: index
---
<Callout icon="fa-comment" theme="warning">
  ###

  <strong>Note:</strong> The Statsig to Wingify Migration Assistant is currently in Beta. Review all migrated output before enabling anything in production.
</Callout>

Migrate your feature setup from Statsig to Wingify using FE MCP Server with a single prompt. The assistant migrates your Statsig configuration to Wingify FE and makes the required code changes to use Wingify FE SDKs.

## **Prerequisites**

Confirm the following before starting the migration.

#### Access and accounts

- Active Statsig project with the gates, configs, and experiments you plan to migrate
- Active Wingify account with Feature Experimentation enabled

#### Workspace setup

- MCP compatible IDE with the Wingify FE MCP server installed — [see the MCP Server setup guide](https://developers.wingify.com/v3/docs/fme-mcp-server)

## Migration flow

1. **Check prerequisites**<br />confirm your Statsig project, Wingify FE account, and IDE setup listed above
2. Add the Wingify FE MCP Server<br />[Add the Wingify FE MCP](https://developers.wingify.com/v3/docs/fme-mcp-server) server to your IDE and configure credentials
3. **Run the migration prompt**<br />Something like _migrate my project from Statsig to Wingify_
4. **Review in the Wingify dashboard and your codebase**<br />Confirm feature flags, rollout and testing rules were created correctly, and review the SDK code changes made by the Assistant
5. **Enable and go live**<br />Turn on the newly created, migrated flags in Wingify, validate it and then you are good to go

## How Wingify FE differs from Statsig

Statsig and Wingify Feature Experimentation both help you roll out features, personalize experiences, and run experiments, but they organize the work differently.

Statsig offers feature gates, dynamic configs, and experiments.

Wingify FE one concept: the **feature flag**. You attach different rule types (like Rollout, Testing, Personalize, Multivariate) to a feature flag depending on the usecase.

Everything in Statsig maps to FE as a feature flag with a rule. A gate becomes a flag with a rollout rule. A dynamic config becomes a flag with variables, served through rollout, testing or personalize rules. An experiment becomes a flag with a testing rule.

After migration, three separate SDK calls in Statsig are replaced by a single call in FE: `getFlag()`

<br />

### Equivalent Features

| What it does              | In Statsig     | In Wingify FE                                   |
| ------------------------- | -------------- | ----------------------------------------------- |
| Turn a feature on or off  | Feature Gate   | Feature Flag + Rollout Rule                     |
| Control settings remotely | Dynamic Config | Feature Flag + Rollout/Testing/Personalize Rule |
| Run an A/B test           | Experiment     | Feature Flag + Testing Rule                     |

<br />

### SDK call comparison

| Area       | Statsig                                     | Wingify FE                                                     |
| ---------- | ------------------------------------------- | -------------------------------------------------------------- |
| Init       | `StatsigClient` + `initializeAsync()`       | `init({ accountId, sdkKey })`                                  |
| Gate check | `getFeatureGate(key).value` sync            | `await getFlag(key, ctx)` → `isEnabled()` async                |
| Config     | `getDynamicConfig(key).value` / `.get()`    | `getFlag()` → `getVariable()` / `getVariables()`               |
| Experiment | `getExperiment(key)` → `groupName`, `value` | `getFlag()` + testing rule; read variables, not variation name |
| Events     | `logEvent()`                                | `trackEvent()`                                                 |

<br />

### Variables vs. variation names

In Statsig, experiment code often branches on a variation name (`groupName`). In FE, you read variables instead. The variation name is not used for branching logic. If you need a label for logging, expose it as a string variable

<br />

### Environment model

| Aspect               | Statsig                                            | Wingify FE                                                                                                                 |
| -------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| SDK key              | One key + optional environment tier set in code    | One SDK key per environment; the key determines the environment                                                            |
| Default environments | Development, Staging, Production built in          | Default environments (Dev, Staging, Prod) provided out of the box; additional environments can be defined within a project |
| Rule targeting       | Rules can be scoped to a specific environment tier | Rules are toggled independently per environment                                                                            |

<br />

## Migrate with the FE MCP Server

The MCP server handles configuration import and code rewrite in one workflow.

### Configuration import

- Recreates feature gates as Feature flags with rollout rules
- Recreates dynamic configs as feature flags with testing/rollout/personalize rules
- Recreates experiments as feature flags with testing rules with variations
- Migrates metrics to Wingify Data360 events and metrics

### Code rewrite

- Replaces Statsig SDK imports with the Wingify FE SDK imports
- Refactors `getFeatureGate()`, `getDynamicConfig()`, and `getExperiment()` to `getFlag()`
- Replaces `logEvent()` with `trackEvent()`
- Updates SDK initialization logic

<br />

### What's in the migration scope

| Statsig type                  | Status                                                                                                                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature gates                 | ✓ Migrated                                                                                                                                                                                                       |
| Dynamic configs               | ✓ Migrated                                                                                                                                                                                                       |
| Experiments                   | ✓ Migrated                                                                                                                                                                                                       |
| Custom-event metrics          | ✓ Migrated                                                                                                                                                                                                       |
| Segments / audience targeting | Coming soon in General Availability Release                                                                                                                                                                      |
| Layers (mutual exclusion)     | Not directly supported. Mutually Exclusive Groups (MEG) are an option — [see the MEG documentation](https://help.vwo.com/hc/en-us/articles/360034153814-How-to-Set-Up-Mutually-Exclusive-Campaign-Groups-in-VWO) |
| Warehouse-native metrics      | Not supported                                                                                                                                                                                                    |

<br />

## Step 1: Configure migration credentials

Three values are configured in the MCP server block.

| Field                     | Purpose                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `WINGIFY_ACCOUNT_ID`      | Wingify Account ID, found in account settings.                                                                              |
| `WINGIFY_API_KEY`         | [Wingify Developer Token](https://help.vwo.com/hc/en-us/articles/360020559993-How-to-Access-VWO-API), used  to create flags |
| `STATSIG_CONSOLE_API_KEY` | Statsig Console API key to read existing gates, configs, and experiments                                                    |

### Step 2: Add the Wingify FE MCP Server

Add the [Wingify FE MCP Server](https://developers.wingify.com/v3/docs/fme-mcp-server) to your IDE and configure it with the credentials from Step 1

### Step 3: Run the migration

Once MCP server is successfully configured, start the migration by typing a single prompt:

<Callout icon="fa-comment" theme="info">
  ### Migrate from Statsig to Wingify
</Callout>

The MCP server scans your codebase, identifies all Statsig components, recreates them in Wingify, and updates your application code automatically.

## Step 4: Verify the migrated output

When the migration completes, the assistant returns a consolidated migration summary in your IDE. Use this summary as your verification checklist before enabling anything. Once verification is done, turn the feature flags and the corresponding rule toggles **ON**.

<br />

### Review the migration summary

| Statsig type   | What to confirm in the summary                                                |
| -------------- | ----------------------------------------------------------------------------- |
| Feature gate   | Feature flag key, rollout rule(s), and status `migrated`.                     |
| Experiment     | Feature flag key, variables, variations, testing rule, and status `migrated`. |
| Dynamic config | Feature flag key, variables, variations, rule count, and status `migrated`.   |
| Metrics        | Status `migrated, failed` or `skipped (already exists)`.                      |

<br />

### Check the Wingify dashboard

#### Flags and rules:

- Each migrated flag key exists in your Wingify project
- Rollout rules match what you had in Statsig gates
- Testing variations and traffic splits look correct
- Flags were created in the intended environment, usually Production

#### Metrics (under Data360 → Metrics)

- All metrics were successfully created in Data360 and linked to the feature flags
- Primary and secondary metrics are linked to feature flags

<Callout icon="fa-lightbulb" theme="success">
  ### Primary and Secondary Metrics

  In Wingify, a feature flag can have **only one** primary metric, but **multiple** secondary metrics. The primary metric is used to decide a winner of a campaign
</Callout>

#### Review the migrated code

- A valid Wingify accountId and FE environment SDK key are used in SDK initialization
- Statsig SDK imports and calls have been fully replaced (getFlag(), trackEvent())
- No branching logic remains on variation names — code reads flag variables instead

## Run a smoke test (after the SDK is connected)

- Re-initialize the SDK or restart the app
- Gate — confirm ON/OFF behavior for a test user
- Config — verify variable values match the dashboard
- Experiment — confirm variation variables and running status
- Events — trigger a key event and confirm it appears in Wingify (validates metric and tracking wiring)
- Change the user ID and re-initialize to confirm consistent bucketing

### Step 5: Enable and go live

- Enable migrated feature flags in the Wingify dashboard (these are **OFF** by default)
- Enable all the rules that should go live
- Monitor feature flag metrics after go-live

<br />

## Troubleshooting

| Issue                      | What to check                                               |
| -------------------------- | ----------------------------------------------------------- |
| Missing flags              | Wingify Developer Token and Account ID in MCP config        |
| Missing metrics            | Statsig Console API key and Data360 access in Wingify       |
| Empty or partial migration | Statsig project permissions                                 |
| Wrong environment          | MCP target environment. The default is Production (`id: 1`) |

<br />

<br />
