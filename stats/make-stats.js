/*
  This script requires https://github.com/cli/cli installed globally
 */
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const writeFile = promisify(require('fs').writeFile);
const { prLabels, prStates, parsingRegex, url, statsFileName } = require('./config');
const { mergeObjects, recombine } = require('./utils');

exec("gh --version")
  .catch(e => {
    console.error("make-stats ERROR: This script requires https://github.com/cli/cli installed\n");
    throw e;
  })
  .then(() => main())
  .then(() => console.log("\nAll done"))
  .catch(e => {
    console.error("make-stats ERROR:\n", e);
  });

async function main() {
  let prDataByAuthor = {}, issueDataByAuthor = {};
  try {
    prDataByAuthor = await collectPullRequestData(prLabels, prStates);
  } catch (e) {
    console.error('ERROR: Failed to fetch PR data');
    throw e;
  }
  try {
    issueDataByAuthor = await collectIssueData(prLabels);
  } catch (e) {
    console.error('ERROR: Failed to fetch issue data');
    throw e;
  }
  prDataByAuthor = mergeObjects(prDataByAuthor, issueDataByAuthor);
  const orderedAuthors = Object.keys(prDataByAuthor)
    .map(authorName => ({
      author: authorName,
      prs: Object.keys(prDataByAuthor[authorName]).length,
    }))
    .sort(makeComparator("prs", "author"))
    .map(authorStats => authorStats.author);
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
    makeMarkdownTable(orderedAuthors, prLabels, prDataByAuthor),
    "",
  ].join("\n");
  const ioResult = await saveStatsToAFile(statsFileName, table);
  console.log(`\nSaving stats ${statsFileName}: ${ioResult}`);
}

async function saveStatsToAFile(fileName, text) {
  try {
    await writeFile(fileName, text);
    return 'Success';
  } catch (e) {
    console.error(`Error writing data to "${fileName}"`);
    return 'Failure';
  }
}

function makeMarkdownTable(authors, labels, dataByAuthor) {
  const columnDelimiter = " | ";
  const rows = [
    'author' + columnDelimiter + labels.join(columnDelimiter),
    "--- | ".repeat(labels.length) + "---",
  ];
  let coveredTasksCountLatest = Number.MAX_SAFE_INTEGER;
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
          ? makePrUrl(dataByAuthor[authorName][label].prNr, dataByAuthor[authorName][label].state[0])
          : " "
      )].join(columnDelimiter)
    );
  });
  return rows.join("\n");
}

function makePrListUrl(authorName) {
  return `[${authorName}](${url.prListFilteredByAuthorPrefix + authorName})`;
}

function makePrUrl(prNr, state) {
  let anchorText =
    (state[0] === 'm' ? "**" : "") +
    `#${prNr}` +
    (state[0] === 'm' ? "**" : ` ${state[0]}`);
  return `[${anchorText}](${url.prPrefix}${prNr})`;
}

async function collectPullRequestData(prLabels, prStates) {
  console.log("NB! Relevant PRs must have labels assigned. Only open and merged PRs are accounted.");
  const dataByAuthor = {};
  await Promise.all(
    recombine(prLabels, prStates)
      .map(async ([label, state]) => {
        const command = fetchPrListGhCommand(label, state);
        try {
          const data = await exec(command);
          const prs = parsePrsData(data.stdout);
          prs.forEach(({prNr, author}) => {
            dataByAuthor[author] = {
              ...dataByAuthor[author],
              [label]: { prNr, state },
            };
          });
        } catch(e) {
          console.error(`ERROR executing "${command}"`);
          throw new Error(e);
        }
      })
  );
  return dataByAuthor;
}

async function collectIssueData(prLabels) {
  console.log("NB! Relevant issues must have their titles starting with 'author_username:' and have labels assigned");
  const dataByAuthor = {};
  const command = fetchIssueListGhCommand(prLabels);
  try {
    const data = await exec(command);
    const issues = parseIssuesData(data.stdout);
    issues.forEach(({issueNr, author, labels}) => {
      labels.forEach(label => {
        dataByAuthor[author] = {
          ...dataByAuthor[author],
          [label]: { prNr: issueNr, state: "issue" },
        };
      });
    });
  } catch(e) {
    console.error(`ERROR executing "${command}"`);
    throw new Error(e);
  }
  return dataByAuthor;
}

function parsePrsData(data) {
  const matches = data.matchAll(parsingRegex.pr);
  return Array.from(matches, ({groups}) => groups);
}

function parseIssuesData(data) {
  const matches = data.matchAll(parsingRegex.issue);
  return Array.from(matches,
    ({ groups: {
      issueNr, author, labels,
    }}) => ({
      issueNr, author, labels: labels.split(", "),
    }));
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

function makeComparator(primaryKeyNumericDescending, secondaryKeyAlphaAscendingCaseInsensitive) {
  return function (a, b) {
    const [aPk, bPk] = [a, b].map(item => item[primaryKeyNumericDescending]);
    if (aPk === bPk) {
      const [aSk, bSk] = [a, b].map(item => item[secondaryKeyAlphaAscendingCaseInsensitive].toLowerCase());
      if (aSk < bSk) return -1;
      return 1;
    }
    return bPk - aPk;
  }
}
