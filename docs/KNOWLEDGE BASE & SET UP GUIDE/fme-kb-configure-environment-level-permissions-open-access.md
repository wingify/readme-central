---
title: Configure Environment-Level Permissions (Open Access)
excerpt: >-
  Configure Environment-Level Permissions to Manage Feature Flag Rules using
  Open Access
deprecated: false
hidden: false
metadata:
  robots: index
---
In Wingify, managing feature flag rules, such as enabling or disabling them, typically requires a user to have account-level Publish permissions. This standard security measure ensures that only authorized personnel can enable or disable rules. However, this can create a bottleneck for users or teams, who often have more restricted access levels (such as Design or Browse) and cannot test their changes without an administrator's assistance.

Wingify’s Open Access feature solves this challenge. It enables an administrator to override this permission requirement for specific environments. By enabling Open Access for an environment, you can empower teams to independently activate and deactivate rules for testing purposes, without granting them risky access to your production environment.

For example, your developers have Design access. They can create feature flag rules, but cannot enable them in the Development environment to test their code. They must wait for a team member with Publish access to do it for them. In this case, admins or account owners can enable Open Access for the Development environment. Now, the developers can freely turn their feature flag rules on and off within that specific environment, while their access to other production environments remains restricted.

Or, your organization brings in a team of contractors to work on a specific project. You want them to be able to test their work in a Staging environment, but you do not want to give them permanent Publish rights that could affect other parts of your application. In this case, admins or account owners can enable Open Access on the Staging environment. The contract team can manage flags for their project as needed. Once the project is complete, you can disable Open Access for that environment.

<Callout icon="📘" theme="info">
  Read more [here](https://help.vwo.com/hc/en-us/articles/51521646544025-Configure-Environment-Level-Permissions-to-Manage-Feature-Flag-Rules-using-Open-Access) 
</Callout>
