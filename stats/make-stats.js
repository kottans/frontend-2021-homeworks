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

const parsingRegex = {
  pr: /^(?<prn>\d+)\t.+\t(?<author>.+):.*$/mg,
  issue: /^(?<issuen>\d+).+\t(?<author>.+):.*\t(?<labels>.*)\t.*$/mg,
};

const url = {
  prListFilteredByAuthorPrefix: baseRepoUrl + "pulls?q=is%3Apr+author%3A",
  prPrefix: baseRepoUrl + "pull/",
  issuePrefix: baseRepoUrl + "issues/",
}

const statsFileName = "./pr-stats.md";

main()
  .then(() => console.log("\nAll done"));

async function main() {
  let prDataByAuthor = {}, issueDataByAuthor = {};
  try {
    prDataByAuthor = await collectPullRequestData(prLabels, prStates);
  } catch (e) {
    console.error('ERROR: Failed to fetch PR data', e);
    return;
  }
  try {
    issueDataByAuthor = await collectIssueData(prLabels);
  } catch (e) {
    console.error('ERROR: Failed to fetch issue data', e);
    return;
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
    makeMDtable(orderedAuthors, prLabels, prDataByAuthor),
    "",
  ].join("\n");
  const ioResult = await saveStatsToAFile(statsFileName, table);
  console.log(`\nSaving stats ${statsFileName}: ${ioResult}`);
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
    (state[0] === 'm' ? "**" : "") +
    `#${prn}` +
    (state[0] === 'm' ? "**" : ` ${state[0]}`);
  return `[${anchorText}](${url.prPrefix}${prn})`;
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
          prs.forEach(({prn, author}) => {
            dataByAuthor[author] = {
              ...dataByAuthor[author],
              [label]: { prn, state },
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
  const data = await exec(fetchIssueListGhCommand(prLabels));
  const issues = parseIssuesData(data.stdout);
  issues.forEach(({issuen, author, labels}) => {
    labels.forEach(label => {
      dataByAuthor[author] = {
        ...dataByAuthor[author],
        [label]: { prn: issuen, state: "issue" },
      };
    });
  });
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
      issuen, author, labels,
    }}) => ({
      issuen, author, labels: labels.split(", "),
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

function mergeObjects(primaryObject, secondaryObject) {
  const mergedObject = {...primaryObject};
  Object.keys(secondaryObject)
    .forEach(key => {
      mergedObject[key] = {
        ...secondaryObject[key],
        ...primaryObject[key],
      };
    });
  return mergedObject;
}

/**
 * Recombines elements from input arrays into an array of tuples
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {[*,*][]}
 */
function recombine(arr1, arr2) {
  return arr1.reduce((acc, e1) => [...acc, ...arr2.map(e2 => [e1, e2])], []);
}
