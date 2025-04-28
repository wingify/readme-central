---
title: Tech Debt Client
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The **VWO FME Tech Debt Client** is a tool that analyzes your VWO flags usage and provides recommendations based on the source code in your project. This application is configurable using command-line arguments.

## Features

- Analyze VWO flag usage in your codebase.
- Provide recommendations for optimizing VWO flags.

## Prerequisites

- Go (if building from source): [Install Go](https://go.dev/doc/install)
- Ensure you have your _VWO API Token_ and _Account ID_.

## Installation

### Building from source

1. Clone the repository
   ```shell
   git clone <https://github.com/wingify/vwo-fme-tech-debt-client.git>  
   cd vwo-fme-tech-debt-client
   ```
2. Build the binary
   ```shell
   # Build the binary
   go build

   # Option 1: Using environment variables
   export VWO_SOURCE_FOLDER=/path/to/source
   export VWO_ACCOUNT_ID=123456
   export VWO_API_TOKEN=abcd123
   export VWO_REPO_BRANCH=main
   export VWO_REPO_NAME=my-repo

   ./vwo-fme-tech-debt-client

   # Option 2: Using command line arguments
   ./vwo-fme-tech-debt-client \
     --sourceFolder=/path/to/source \
     --accountId=123456 \
     --apiToken=abcd123 \
     --repoBranch=main \
     --repoName=my-repo

   ```

## Usage

### Command-line arguments

The application accepts the following arguments:

| Argument         | Description               | Required |
| ---------------- | ------------------------- | -------- |
| `--sourceFolder` | Path to the source folder | Yes      |
| `--accountId`    | VWO Account ID            | Yes      |
| `--apiToken`     | VWO API Token             | Yes      |
| `--repoBranch`   | Branch of the repository  | Yes      |
| `--repoName`     | Name of the repository    | Yes      |

<br />

***

### Example Commands

#### Basic Usage

Run the client with the required parameters:

```shell
./tech-debt-client --sourceFolder=/path/to/source --accountId=123456 --apiToken=abcd123 --repoBranch=main --repoName=my-repo
```

## Resources

| Resource | Link                                                              |
| :------- | :---------------------------------------------------------------- |
| GitHub   | <https://github.com/wingify/vwo-fme-tech-debt-client/tree/master> |