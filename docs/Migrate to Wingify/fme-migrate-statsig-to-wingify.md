---
title: Statsig To Wingify Migration Assistant
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

1. **[Check prerequisites](#step-1-check-prerequisites-and-configure-migration-credentials)**<br />Confirm your Statsig project, Wingify FE account, and IDE setup listed above
2. **[Add the Wingify FE MCP Server](#step-2-add-the-wingify-fe-mcp-server)**<br />[Add the Wingify FE MCP](https://developers.wingify.com/v3/docs/fme-mcp-server) server to your IDE and configure credentials
3. **[Run the migration prompt](#step-3-run-the-migration)**<br />Something like _migrate my project from Statsig to Wingify_
4. [**Verify the migrated output**](#step-4-verify-the-migrated-output)<br />Confirm feature flags, rollout, testing and personalize rules were created correctly, and review the SDK code changes made by the Assistant
5. **[Enable and go live](#step-5-enable-and-go-live)**<br />Turn on the newly created, migrated flags in Wingify, validate it and then you are good to go

## How Wingify FE differs from Statsig

Statsig and Wingify Feature Experimentation both help you roll out features, personalize experiences, and run experiments, but they organize the work differently.

Statsig offers feature gates, dynamic configs, and experiments.

Wingify FE one concept: the **feature flag**. You attach different rule types (like Rollout, Testing, Personalize, Multivariate) to a feature flag depending on the usecase.

Everything in Statsig maps to FE as a feature flag with a rule. A gate becomes a flag with a rollout rule. A dynamic config becomes a flag with variables, served through rollout, testing or personalize rules. An experiment becomes a flag with a testing rule.

After migration, three separate SDK calls in Statsig are replaced by a single call in FE: `getFlag()`

## Equivalent Features

| What it does              | In Statsig     | In Wingify FE                                   |
| ------------------------- | -------------- | ----------------------------------------------- |
| Turn a feature on or off  | Feature Gate   | Feature Flag + Rollout Rule                     |
| Control settings remotely | Dynamic Config | Feature Flag + Rollout/Testing/Personalize Rule |
| Run an A/B test           | Experiment     | Feature Flag + Testing Rule                     |

## SDK call comparison

| Area       | Statsig                                     | Wingify FE                                                     |
| ---------- | ------------------------------------------- | -------------------------------------------------------------- |
| Init       | `StatsigClient` + `initializeAsync()`       | `init({ accountId, sdkKey })`                                  |
| Gate check | `getFeatureGate(key).value` sync            | `await getFlag(key, ctx)` → `isEnabled()` async                |
| Config     | `getDynamicConfig(key).value` / `.get()`    | `getFlag()` → `getVariable()` / `getVariables()`               |
| Experiment | `getExperiment(key)` → `groupName`, `value` | `getFlag()` + testing rule; read variables, not variation name |
| Events     | `logEvent()`                                | `trackEvent()`                                                 |

## Variables vs. variation names

In Statsig, experiment code often branches on a variation name (`groupName`). In FE, you read variables instead. The variation name is not used for branching logic. If you need a label for logging, expose it as a string variable

## Environment model

| Aspect               | Statsig                                            | Wingify FE                                                                                                                 |
| -------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| SDK key              | One key + optional environment tier set in code    | One SDK key per environment; the key determines the environment                                                            |
| Default environments | Development, Staging, Production built in          | Default environments (Dev, Staging, Prod) provided out of the box; additional environments can be defined within a project |
| Rule targeting       | Rules can be scoped to a specific environment tier | Rules are toggled independently per environment                                                                            |

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

## What's in the migration scope

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

## Step 1: Check prerequisites and configure migration credentials

Three values are configured in the MCP server block.

| Field                     | Purpose                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `WINGIFY_ACCOUNT_ID`      | Wingify Account ID, found in account settings.                                                                              |
| `WINGIFY_API_KEY`         | [Wingify Developer Token](https://help.vwo.com/hc/en-us/articles/360020559993-How-to-Access-VWO-API), used  to create flags |
| `STATSIG_CONSOLE_API_KEY` | Statsig Console API key to read existing gates, configs, and experiments                                                    |

## Step 2: Add the Wingify FE MCP Server

Add the [Wingify FE MCP Server](https://developers.wingify.com/v3/docs/fme-mcp-server) to your IDE and configure it with the credentials from Step 1

## Step 3: Run the migration prompt

Once MCP server is successfully configured, start the migration by typing a single prompt:

<Callout icon="fa-comment" theme="info">
  ### Migrate from Statsig to Wingify
</Callout>

The MCP server scans your codebase, identifies all Statsig components, recreates them in Wingify, and updates your application code automatically.

## Step 4: Verify the migrated output

When the migration completes, the assistant returns a consolidated migration summary in your IDE. Use this summary as your verification checklist before enabling anything. Once verification is done, turn the feature flags and the corresponding rule toggles **ON**.

### Review the migration summary

| Statsig type   | What to confirm in the summary                                                |
| -------------- | ----------------------------------------------------------------------------- |
| Feature gate   | Feature flag key, rollout rule(s), and status `migrated`.                     |
| Experiment     | Feature flag key, variables, variations, testing rule, and status `migrated`. |
| Dynamic config | Feature flag key, variables, variations, rule count, and status `migrated`.   |
| Metrics        | Status `migrated, failed` or `skipped (already exists)`.                      |

### Check the Wingify dashboard

#### Flags and rules:

- Each migrated flag key exists in your Wingify project
- Rollout rules match what you had in Statsig gates
- Testing variations and traffic splits look correct

#### Metrics (under Data360 → Metrics)

- All metrics were successfully created in Data360 and linked to the feature flags
- Primary and secondary metrics are linked to feature flags

<Callout icon="fa-lightbulb" theme="success">
  ### Primary and Secondary Metrics

  In Wingify, a feature flag can have **only one** primary metric, but **multiple** secondary metrics. The primary metric is used to decide a winner of a campaign
</Callout>

### Review the migrated code

- A valid Wingify accountId and FE environment SDK key are used in SDK initialization
- Statsig SDK imports and calls have been fully replaced (getFlag(), trackEvent())
- No branching logic remains on variation names — code reads flag variables instead

### Run a smoke test (after the SDK is connected)

- Re-initialize the SDK or restart the app
- Gate — confirm ON/OFF behavior for a test user
- Config — verify variable values match the dashboard
- Experiment — confirm variation variables and running status
- Events — trigger a key event and confirm it appears in Wingify (validates metric and tracking wiring)
- Change the user ID and re-initialize to confirm consistent bucketing

## Step 5: Enable and go live

- Enable migrated feature flags in the Wingify dashboard (these are **OFF** by default)
- Enable all the rules that should go live
- Monitor feature flag metrics after go-live

## Troubleshooting

<Table>
  <thead>
    <tr>
      <th>
        Issue
      </th>

      <th>
        What to check
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Missing flags or metrics
      </td>

      <td>
        1. Wingify Developer Token and Account ID in MCP config
        2. Statsig Console API key
      </td>
    </tr>

    <tr>
      <td>
        Empty or partial migration
      </td>

      <td>
        Statsig project permissions
      </td>
    </tr>
  </tbody>
</Table>

## FAQ

<Accordion title="I have multiple Statsig projects. How do I migrate all of them?">
  Each _Statsig Console API_ key is scoped to one project, so the migration runs one project at a time. Repeat the migration for each project, updating only `STATSIG_CONSOLE_API_KEY` in your MCP configuration between runs.

  You can structure the destination in two ways:

  1. **All projects into one Wingify account** — run each migration with the same Wingify credentials. This is simpler, but flag keys must be unique across the account, so watch for collisions.
  2. **One workspace per Statsig project** — create a Wingify workspace for each project and target it per run. This preserves project boundaries and per-team access.
</Accordion>

<Accordion title="Does the migration modify my Statsig setup?">
  No. The Statsig Console API key is used only to read your gates, configs, experiments, and metrics. The migration never writes to or changes anything in Statsig, so your existing setup keeps running untouched until you choose to retire it.
</Accordion>

<Accordion title="Will my users be re-bucketed? Will running experiments be disrupted?">
  Yes. Statsig and Wingify FE use different deterministic bucketing algorithms, so the same user ID may land in a different variation after migration.

  For feature gates and rollouts, this is usually harmless. For running experiments, do not carry results across platforms. Either conclude the experiment in Statsig before migrating, or restart it fresh in Wingify FE. Experiment results and historical data do not migrate.
</Accordion>

<Accordion title="Which SDKs does the code rewrite support?">
  The assistant rewrites application code for languages that have a Wingify FE SDK equivalent to your Statsig SDK.

  The supported languages are: Android, iOS, React-Native, Flutter, Go, Java, Javascript, NextJS, Node, PHP, Python, React-Web, Ruby, .NET

  For unsupported languages, the configuration import still works, but you will have to manually write the code, using the <a href="https://developers.wingify.com/v2/docs/gateway-service">Gateway Service</a>
</Accordion>

<Accordion title="What happens to my Statsig historical experiment data?">
  It stays in Statsig. Experiment results, exposure logs, and metric history are <b>not</b> migrated. In Wingify, reporting starts fresh from the moment your migrated flags go live.
</Accordion>

<br />
