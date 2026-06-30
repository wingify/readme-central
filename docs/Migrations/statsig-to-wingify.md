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

After the migration is completed, a checklist is available. Verify the setup inside Wingify Feature Flags, as well as the code snippets

<br />

### Review the migration summary

| Statsig type   | What to confirm in the summary                                                |
| -------------- | ----------------------------------------------------------------------------- |
| Metrics        | Status `migrated` or `skipped (already exists)`.                              |
| Feature gate   | Feature flag key, rollout rule(s), and status `migrated`.                     |
| Dynamic config | Feature flag key, variables, variations, rule count, and status `migrated`.   |
| Experiment     | Feature flag key, variables, variations, testing rule, and status `migrated`. |

<br />

### Check the Wingify dashboard

- Each migrated flag key exists in your Wingify project
- Rollout rules and targeting match what you had in Statsig gates
- Testing variations and traffic splits look correct
- Primary and secondary metrics are linked
- Flags were created in the intended environment, usually Production
- All metrics were successfully created in Data360 and linked to the feature flags

<br />

## Troubleshooting

| Issue                      | What to check                                               |
| -------------------------- | ----------------------------------------------------------- |
| Missing flags              | Wingify Developer Token and Account ID in MCP config        |
| Missing metrics            | Statsig Console API key and Data360 access in Wingify       |
| Empty or partial migration | Statsig project permissions                                 |
| Wrong environment          | MCP target environment. The default is Production (`id: 1`) |

<br />

## Next steps and resources

1. Enable migrated feature flags in the Wingify dashboard (these are OFF by default)
2. Start testing campaigns for experiments that should go live
3. Monitor Data360 metrics and experiment goals after go-live

<br />
