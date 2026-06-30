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

### Variables vs. variation names

In Statsig, experiment code often branches on a variation name (`groupName`). In Wingify FE, you read typed variables instead. The variation name is not the primary SDK property.

After migration, code should use `flag.getVariable('buttonText', 'default')` rather than checking `if (variation === 'Variation A')`. If you need a label for logging, expose it as a string variable, such as `variation_name`.

### Environment model

| Aspect               | Statsig                                            | Wingify FE                                                      |
| -------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| SDK key              | One key + optional environment tier set in code    | One SDK key per environment; the key determines the environment |
| Default environments | Development, Staging, Production built in          | User-defined environments within a project                      |
| Rule targeting       | Rules can be scoped to a specific environment tier | Rules are toggled independently per environment                 |

| Statsig setup                               | Wingify equivalent                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Dev / Staging / Prod SDK keys               | Three Wingify environments, each with its own SDK key                                                  |
| Rule scoped to development tier             | Create or toggle rules in the Wingify Development environment                                          |
| `environment: { tier: 'staging' }` at init  | Use the Staging environment SDK key in `init()`                                                        |
| Console API reads gates for one environment | MCP defaults to Production (`environmentIdOrKey = "1"`); override when migrating to other environments |

## Terminology mapping

Use this as a quick reference when reviewing what the migration assistant created in Wingify.

| Statsig                  | Wingify FE                                                                          | Notes                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Feature Gate             | Feature Flag + boolean variable (`isEnabled`) + Rollout rule(s)                     | Gate pass/fail maps to `flag.isEnabled()`.                                              |
| Dynamic Config           | Feature Flag + typed variables + variations + Rollout / Personalize / Testing rules | Config keys map to flag variables; rule `returnValue` maps to variation.                |
| Experiment               | Feature Flag + variables + variations + `FLAG_TESTING` rule                         | Control group maps to default variation; treatments map to additional variations.       |
| Experiment parameter     | Flag variable                                                                       | Typed as boolean, int, float, string, or JSON.                                          |
| Metric / `logEvent()`    | Data360 custom event + `trackEvent()`                                               | Call after `getFlag()` for correct attribution.                                         |
| `StatsigUser` / `userID` | `userContext` with `id` + optional attributes                                       | Custom attributes are top-level attributes on `userContext`, not nested under `custom`. |
| Layer                    | No direct equivalent                                                                | Wingify uses rule-level traffic allocation; mutual exclusion is configured differently. |
| Segment                  | Wingify audience / targeting on rules                                               | Not auto-migrated by MCP tools today.                                                   |
| Tags on gates/configs    | Flag labels                                                                         | Mapped from Statsig `tags[]`.                                                           |
| Server Secret Key        | SDK Key per environment                                                             | From Wingify Websites & Apps → Default Project.                                         |
| `customIDs`              | Custom ID fields on user context                                                    | Used for multi-entity bucketing.                                                        |

## Migrate with the Wingify agent

The Wingify migration agent handles configuration import and code rewrite in one workflow.

### Configuration import

The assistant:

- Recreates feature gates as Wingify flags with rollout rules.
- Recreates dynamic configs as flags with typed variables.
- Recreates experiments as flags with testing rules and variations.
- Migrates metrics to Wingify Data360.

### Code rewrite

The assistant:

- Replaces Statsig SDK imports with the Wingify FME SDK.
- Refactors `getFeatureGate()`, `getDynamicConfig()`, and `getExperiment()` to `getFlag()`.
- Replaces `logEvent()` with `trackEvent()`.
- Updates SDK initialization.

### What's in migration scope

| Statsig type                  | Status               |
| ----------------------------- | -------------------- |
| Feature gates                 | ✓ Migrated           |
| Dynamic configs               | ✓ Migrated           |
| Experiments                   | ✓ Migrated           |
| Custom-event metrics          | ✓ Migrated           |
| Segments / audience targeting | Not auto-migrated    |
| Layers (mutual exclusion)     | No direct equivalent |
| Warehouse-native metrics      | Not migrated         |

## Add the Wingify MCP server

Add the Wingify FME MCP server to Cursor before running the migration.

### Step 1: Open MCP settings

Open **Cursor Settings → MCP → Add new global MCP server**. This opens or creates your `mcp.json` file.

### Step 2: Add the server block

Paste the following into `mcp.json`. If you already have other MCP servers, add this inside the existing `"mcpServers"` object.

```json
{
  "mcpServers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "VWO_API_KEY": "YOUR_DEVELOPER_TOKEN"
      }
    }
  }
}
```

### Step 3: Replace the credential placeholders

| Placeholder            | Replace with                       |
| ---------------------- | ---------------------------------- |
| `YOUR_ACCOUNT_ID`      | Your Wingify Account ID (numeric). |
| `YOUR_DEVELOPER_TOKEN` | Your Wingify Developer Token.      |

### Step 4: Save and confirm

Save `mcp.json`, go back to **Cursor Settings → MCP**, and confirm `vwo-mcp-server` shows a green active status.

If it stays red, verify Node.js is installed by running `npx -v`. The command should return a version number. Then restart Cursor.

<Callout icon="fa-book" theme="info">
  ###

  Full MCP setup reference: Wingify MCP Server documentation.
</Callout>

## Run the migration

Once the Wingify migration assistant is connected, start the migration by typing a single prompt in Cursor:

<Callout icon="fa-comment" theme="info">
  ###

  Type this in Cursor: <strong>Migrate from Statsig to Wingify</strong>
</Callout>

The assistant scans your codebase, identifies all Statsig components, recreates them in Wingify, and updates your application code automatically.

<Callout icon="fa-lightbulb" theme="success">
  ###

  After the assistant connects, ask it to <strong>Add Wingify Rules</strong> once before running the migration. This sets up project-level rules for your codebase and only needs to be done once per project.
</Callout>

## Verify the agent's output

After you run the migration, the assistant returns a consolidated summary. Use it as your checklist before enabling anything in production.

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
