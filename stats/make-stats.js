/*
  This script requires https://github.com/cli/cli installed globally
 */
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const writeFile = promisify(require('fs').writeFile);

console.log("This script requires https://github.com/cli/cli installed\n");

const baseRepoUrl = "https://github.com/kottans/frontend-2021-homeworks/";

const prLabels = [
  "Hooli-style Popup",
  "JS DOM",
  "JS pre-OOP",
  "JS OOP",
  "JS post-OOP",
  "Memory Pair Game",
  "Friends App",
];

const prStates = [
  "open",
  "merged",
];

const url = {
  prListFilteredByAuthorPrefix: baseRepoUrl + "pulls?q=is%3Apr+author%3A",
  prPrefix: baseRepoUrl + "pull/",
  issuePrefix: baseRepoUrl + "issues/",
}

const statsFileName = "./pr-stats.md";

main();

async function main() {
  let prDataByAuthor = {}, issueDataByAuthor = {};
  try {
    prDataByAuthor = await collectPullRequestData(prLabels, prStates);
  } catch (e) {
    console.error('ERROR: Failed to collect PR data', e);
    return;
  }
  try {
    issueDataByAuthor = await collectIssueData(prLabels);
  } catch (e) {
    console.error('ERROR: Failed to collect issue data', e);
    return;
  }
  Object.keys(issueDataByAuthor)
    .forEach(authorName => {
      prDataByAuthor[authorName] = {
        ...issueDataByAuthor[authorName],
        ...prDataByAuthor[authorName],
      };
    });
  const orderedAuthors = Object.keys(prDataByAuthor)
    .map(authorName => ({
      author: authorName,
      prs: Object.keys(prDataByAuthor[authorName]).length,
    }))
    .sort((a,b) => {
      if (a.prs === b.prs) {
        if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
        return 1;
      }
      return b.prs - a.prs;
    }).map(authorStats => authorStats.author);
  const table = [
    "# Open and merged PRs by task labels",
    "",
    `_as of ${new Date().toISOString()} UTC_`,
    "",
    "PR reference legend:",
    " - \\#xxx o -- PR is yet open ",
    " - \\#xxx i -- labelled issue referring to p2p PR(s)",
    " - **\\#xxx** -- PR is merged",
    "",
    makeMDtable(orderedAuthors, prLabels, prDataByAuthor),
    "",
  ].join("\n");
  const ioResult = await saveStatsToAFile(statsFileName, table);
  console.log(`Saving stats ${statsFileName}: ${ioResult}`);
}

async function saveStatsToAFile(fileName, text) {
  try {
    await writeFile(fileName, text);
    return 'Success';
  } catch (err) {
    console.error(`Error writing data to "${fileName}"`);
    return 'Failure';
  }
}

function makeMDtable(authors, labels, dataByAuthor) {
  const columnDelimiter = " | ";
  const rows = [];
  let coveredTasksCountLatest = Number.MAX_SAFE_INTEGER;
  rows.push('author' + columnDelimiter + labels.join(columnDelimiter));
  rows.push("--- | ".repeat(labels.length) + "---");
  authors.forEach(authorName => {
    const coveredTasksCount = Object.keys(dataByAuthor[authorName]).length;
    if (coveredTasksCount < coveredTasksCountLatest) {
      rows.push(
        `**${coveredTasksCount} task${coveredTasksCount > 1 ? 's' : ''}**` +
        columnDelimiter.repeat(labels.length)
      );
      coveredTasksCountLatest = coveredTasksCount;
    }
    rows.push([
      makePrListUrl(authorName),
      ...labels.map(label =>
        dataByAuthor[authorName][label]
          ? makePrUrl(dataByAuthor[authorName][label].prn, dataByAuthor[authorName][label].state[0])
          : " "
      )].join(columnDelimiter)
    );
  });
  return rows.join("\n");
}

function makePrListUrl(authorName) {
  return `[${authorName}](${url.prListFilteredByAuthorPrefix + authorName})`;
}

function makePrUrl(prn, state) {
  let anchorText =
    (state === 'm' ? "**" : "") +
    `#${prn}` +
    (state === 'm' ? "**" : ` ${state}`);
  return `[${anchorText}](${url.prPrefix}${prn})`;
}

async function collectPullRequestData(prLabels, prStates) {
  console.log("NB! Relevant PRs must have labels assigned. Only open and merged PRs are accounted.");
  const dataByAuthor = {};
  await Promise.all(
    prLabels.map(async (label) => {
      await Promise.all(
        prStates.map(async (state) => {
          const command = fetchPrListGhCommand(label, state);
          try {
            const data = await exec(command);
            const prs = parsePrsData(data.stdout);
            prs.forEach(({prn, author}) => {
              if (!dataByAuthor[author]) dataByAuthor[author] = {};
              dataByAuthor[author][label] = {
                prn,
                state,
              };
            });
          } catch(e) {
            console.error(`ERROR executing "${command}"`);
            throw new Error(e);
          }
        })
      )
    })
  );
  return dataByAuthor;
}

async function collectIssueData(prLabels) {
  console.log("NB! Relevant issues must have their titles starting with 'author_username:' and have labels assigned");
  const dataByAuthor = {};
  const data = await exec(fetchIssueListGhCommand(prLabels));
  const issues = parseIssuesData(data.stdout);
  issues.forEach(({issuen, author, labels}) => {
    if (!dataByAuthor[author]) dataByAuthor[author] = {};
    labels.forEach(label => {
      dataByAuthor[author][label] = {
        prn: issuen,
        state: "issue",
      };
    });
  });
  return dataByAuthor;
}

function parsePrsData(data) {
  const result = [];
  const matches = data.matchAll(/^(?<prn>\d+)\t.+\t(?<author>.+):.*$/mg);
  for (const match of matches) {
    result.push(match.groups);
  }
  return result;
}

function parseIssuesData(data) {
  const result = [];
  const matches = data.matchAll(/^(?<issuen>\d+).+\t(?<author>.+):.*\t(?<labels>.*)\t.*$/mg);
  for (const match of matches) {
    const {issuen, author, labels} = match.groups;
    result.push({
      issuen,
      author,
      labels: labels.split(", "),
    });
  }
  return result;
}

function fetchPrListGhCommand(label, state) {
  return `gh pr list --state ${state} --label "${label}" --limit 200`;
}

function fetchIssueListGhCommand(labels) {
  return [
    "gh issue list --state all --limit 200 ",
    ...labels.map(label => `"${label}"`),
  ].join(" --label ");
}
