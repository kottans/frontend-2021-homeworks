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
}

const statsFileName = "./pr-stats.md";

main();

async function main() {
  let dataByAuthor;
  try {
    dataByAuthor = await collectPullRequestData();
  } catch (e) {
    console.error('Failed to collect PR data', e);
    return;
  }
  const orderedAuthors = Object.keys(dataByAuthor)
    .map(authorName => ({
      author: authorName,
      prs: Object.keys(dataByAuthor[authorName]).length,
    }))
    .sort((a,b) => {
      if (a.prs === b.prs) {
        if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
        return 1;
      }
      return b.prs - a.prs;
    }).map(authorStats => authorStats.author);
  const table = "Open and merged PRs by task labels\n\n" +
    `_as of ${new Date().toISOString()} UTC_\n\n` +
    makeMDtable(orderedAuthors, prLabels, dataByAuthor);
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
  rows.push('author' + columnDelimiter + labels.join(columnDelimiter));
  rows.push("--- | ".repeat(labels.length) + "---");
  authors.forEach(authorName => {
    const row = [makePrListUrl(authorName),
      ...labels.map(label => {
        return dataByAuthor[authorName][label]
         ? makePrUrl(dataByAuthor[authorName][label].prn, dataByAuthor[authorName][label].state[0])
         : " ";
      })];
    rows.push(row.join(columnDelimiter));
  });
  return rows.join("\n")+"\n";
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

async function collectPullRequestData() {
  const dataByAuthor = {};
  await Promise.all(
    prLabels.map( async (label) => {
      await Promise.all(
        prStates.map(async (state) => {
          const command = getGhCommand(label, state)
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

function parsePrsData(data) {
  const result = [];
  const matches = data.matchAll(/^(?<prn>\d+)\t.+\t(?<author>.+):.*$/mg);
  for (const match of matches) {
    result.push(match.groups);
  }
  return result;
}

function getGhCommand(label, state) {
  return `gh pr list --state ${state} --label "${label}" --limit 200`;
}
