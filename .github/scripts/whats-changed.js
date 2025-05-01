/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Run a git command and return the output
const runGitCommand = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf-8' }).trim();
  } catch (err) {
    console.error(`Command failed: ${cmd}\n`, err);
    return '';
  }
};

// Get list of files by status (A = added, D = deleted, M = modified)
const getFilesByStatus = (status) => {
  return runGitCommand(`git diff --name-status HEAD^ HEAD | grep "^${status}" | cut -f2-`);
};

// Get the author of the commit (single author per commit)
const getCommitAuthor = () => {
  return runGitCommand('git log -1 --pretty=format:"%an"');
};

// Format message section per category
const formatSection = (label, emoji, files) => {
  if (!files) return '';
  const list = files.split('\n').filter(Boolean).map(file => `• ${file}`).join('\n');
  return `${emoji} *${label}:*\n${list}\n`;
};

// Main
const main = () => {
  const author = getCommitAuthor();

  const added = getFilesByStatus('A');
  const deleted = getFilesByStatus('D');
  const modified = getFilesByStatus('M');

  let message = '';

  if (added) {
    message += formatSection('Added Files', '📁', added);
    message += `_Added by: ${author}_\n\n`;
  }

  if (deleted) {
    message += formatSection('Deleted Files', '🗑️', deleted);
    message += `_Deleted by: ${author}_\n\n`;
  }

  if (modified) {
    message += formatSection('Modified Files', '✏️', modified);
    message += `_Modified by: ${author}_\n`;
  }

  message += `\nAPI Reference: https://developers.vwo.com \nFME Docs: https://developers.vwo.com/v2/docs  \n`;

  // Output to GITHUB_OUTPUT
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(outputPath, `message<<EOF\n${message.trim()}\nEOF\n`);
  } else {
    console.log('GITHUB_OUTPUT not defined');
  }
};

main();
