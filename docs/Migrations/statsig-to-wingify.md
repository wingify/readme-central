---
title: Statsig To Wingify
excerpt: Migrate your Statsig setup to Wingify
deprecated: false
hidden: true
metadata:
  robots: index
---
Migrate your feature setup from Statsig to Wingify using the FE MCP Server and running a single prompt. It will migrate your Statsig configuration to Wingify FE, and make the required code changes to use Wingify FE SDKs.

<br />

## Migration flow

1. **Check prerequisites**<br />a. Statsig project with the gates, configs, and experiments you plan to migrate<br />b. Wingify account with **Feature Experimentation enabled**
2. **Add the Wingify FE MCP Server**<br />[Add the Wingify FE MCP](https://developers.wingify.com/v2/docs/fme-mcp-server) server to your IDE and required credentials
3. **Run the migration prompt**<br />Something like _migrate my project from statsig to wingify_
4. **Review in the Wingify dashboard**<br />Confirm your feature flags, rollout and testing rules were created correctly
5. **Enable and go live**<br />Turn on the newly created, migrated flags in Wingify, and you are good to go

<br />

## Configure migration credentials

Three values are configured in the MCP server block.

| Field                     | Purpose                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `WINGIFY_ACCOUNT_ID`      | Wingify Account ID, found in account settings.                                                                              |
| `WINGIFY_API_KEY`         | [Wingify Developer Token](https://help.vwo.com/hc/en-us/articles/360020559993-How-to-Access-VWO-API), used  to create flags |
| `STATSIG_CONSOLE_API_KEY` | Statsig Console API key to read existing gates, configs, and experiments                                                    |

<br />

## How Wingify FE differs from Statsig

Statsig and Wingify Feature Experimentation both help you roll out features, personalize experiences, and run experiments, but they organize that work differently.

Statsig offers feature gates, dynamic configs, and experiments.

Wingify FE one concept: the feature flag. You attach different rule types (like Rollout, Testing, Personalize, MVT) to a feature flag depending on the usecase.

Everything in Statsig maps to FE as a feature flag with a rule. So, a gate becomes a flag with a rollout rule. A dynamic config becomes a flag with variables and personalization rules. And an experiment becomes a flag with a testing rule.

After migration, three separate SDK calls in Statsig are replaced by a single call in FE: `getFlag()`

<br />

### Equivalent Features

| What it does              | In Statsig     | In FE                           |
| ------------------------- | -------------- | ------------------------------- |
| Turn a feature on or off  | Feature Gate   | Feature Flag + Rollout Rule     |
| Control settings remotely | Dynamic Config | Feature Flag + Personalize Rule |
| Run an A/B test           | Experiment     | Feature Flag + Testing Rule     |

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

In Statsig, experiment code often branches on a variation name (`groupName`). In FE, you read variables instead. The variation name is not used for branching logic.

<br />

### Environment model

| Aspect               | Statsig                                            | Wingify FE                                                      |
| -------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| SDK key              | One key + optional environment tier set in code    | One SDK key per environment; the key determines the environment |
| Default environments | Development, Staging, Production built in          | User-defined environments within a project                      |
| Rule targeting       | Rules can be scoped to a specific environment tier | Rules are toggled independently per environment                 |

<br />

## Migrate with the FE MCP Server

The MCP server handles configuration import and code rewrite in one workflow.

### Configuration import

- Recreates feature gates as Feature flags with rollout rules
- Recreates dynamic configs as feature flags with personalize rules
- Recreates experiments as feature flags with testing rules with variations
- Migrates metrics to Wingify Data360 events and metrics

### Code rewrite

- Replaces Statsig SDK imports with the Wingify FE SDK imports
- Refactors `getFeatureGate()`, `getDynamicConfig()`, and `getExperiment()` to `getFlag()`
- Replaces `logEvent()` with `trackEvent()`
- Updates SDK initialization logic

<br />

### What's in the migration scope

| Statsig type                  | Status                                       |
| ----------------------------- | -------------------------------------------- |
| Feature gates                 | ✓ Migrated                                   |
| Dynamic configs               | ✓ Migrated                                   |
| Experiments                   | ✓ Migrated                                   |
| Custom-event metrics          | ✓ Migrated                                   |
| Segments / audience targeting | Currently not configured (coming soon in v1) |
| Layers (mutual exclusion)     | Not directly supported (MEG is an option)    |
| Warehouse-native metrics      | Not supported                                |

<br />

## Run the migration

Once MCP server is successfully configured, start the migration by typing a single prompt:

<Callout icon="fa-comment" theme="info">
  ### Migrate from Statsig to Wingify
</Callout>

The MCP server scans your codebase, identifies all Statsig components, recreates them in Wingify, and updates your application code automatically.

<Callout icon="fa-lightbulb" theme="success">
  ###

  After the assistant connects, ask it to <strong>Add Wingify Rules</strong> once before running the migration. This sets up project-level rules for your codebase and only needs to be done once per project.
</Callout>

<br />

## Verify the migrated output

After you run the migration, there is a consolidated summary. Use it as your checklist before enabling anything in production.

### Review the migration summary

| Statsig type   | What to confirm in the summary                                                |
| -------------- | ----------------------------------------------------------------------------- |
| Metrics        | Status `migrated` or `skipped (already exists)`.                              |
| Feature gate   | Feature flag key, rollout rule(s), and status `migrated`.                     |
| Dynamic config | Feature flag key, variables, variations, rule count, and status `migrated`.   |
| Experiment     | Feature flag key, variables, variations, testing rule, and status `migrated`. |

### Check the Wingify dashboard

Confirm that:

- Each migrated flag key exists in your Wingify project.
- Rollout rules and targeting match what you had in Statsig gates.
- Experiment variations and traffic splits look correct.
- Primary and secondary experiment goals are linked.
- Flags were created in the intended environment, usually Production.

<Callout icon="fa-triangle-exclamation" theme="warning">
  ###

  Migrated rules may be enabled while the feature flag itself is still disabled. Enable feature flags only after you've reviewed them in the dashboard.
</Callout>

### Accept vs. escalate

| Accept when                                           | Escalate when                                                   |
| ----------------------------------------------------- | --------------------------------------------------------------- |
| Migration summary looks complete.                     | Metrics or flags are missing or failed.                         |
| Flags, variables, and rules match your Statsig setup. | Experiment goals are not linked though they existed in Statsig. |
| Experiment goals are linked correctly.                | The summary contains a large number of failed items.            |

## Metrics check in Data360

Full migration runs metrics first, then flags. In the Wingify dashboard under **Data360 → Metrics**, confirm:

- Each important Statsig metric has a matching Wingify metric or custom event.
- Metric names and event names align with what experiments and flags reference.
- Primary vs. secondary goals on experiments match your Statsig setup.

| Issue                                 | What to check                                                                            |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| Experiment migrated but goals missing | Metric migration may have failed. Re-run metric migration or create the metric manually. |
| Duplicate metrics                     | The agent may report `skipped`. Confirm you're not expecting a new copy.                 |
| Hidden Statsig metrics missing        | Hidden metrics are excluded by default. Ask to include them if needed.                   |

## Smoke test after the SDK is connected

After your application uses the Wingify SDK, run these checks:

1. Re-initialize the SDK or restart the app.
2. For gates, confirm ON/OFF behavior for a test user.
3. For configs, verify variable values match the dashboard.
4. For experiments, confirm variation variables and running status.
5. For events, trigger a key event and confirm it appears in Wingify. This validates metric and tracking wiring.
6. Change the user ID and re-initialize to confirm consistent bucketing.

## Troubleshooting

| Issue                      | What to check                                                |
| -------------------------- | ------------------------------------------------------------ |
| Missing flags              | Wingify Developer Token and Account ID in MCP config.        |
| Missing metrics            | Statsig Console API key and Data360 access in Wingify.       |
| Empty or partial migration | Statsig project permissions.                                 |
| Wrong environment          | MCP target environment. The default is Production (`id: 1`). |

When escalating, share the project name, environment, metric names, flag keys, and the migration summary.

## Next steps and resources

Once the migration summary looks clean and the dashboard checks pass, complete the cutover.

1. Enable migrated feature flags in the Wingify dashboard.
2. Start testing campaigns for experiments that should go live.
3. Confirm the app uses the Wingify SDK and passes smoke tests.
4. Validate in Staging and Dev before full Production cutover.
5. Monitor Data360 metrics and experiment goals after go-live.
6. Retire Statsig only after Wingify is validated in production.

<br />
