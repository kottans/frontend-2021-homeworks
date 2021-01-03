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
  pr: /^(?<prNr>\d+)\t.+\t(?<author>.+):.*$/mg,
  issue: /^(?<issueNr>\d+).+\t(?<author>.+):.*\t(?<labels>.*)\t.*$/mg,
};

const url = {
  prListFilteredByAuthorPrefix: baseRepoUrl + "pulls?q=is%3Apr+author%3A",
  prPrefix: baseRepoUrl + "pull/",
  issuePrefix: baseRepoUrl + "issues/",
}

const statsFileName = "./pr-stats.md";

module.exports = {
  prLabels,
  prStates,
  parsingRegex,
  url,
  statsFileName,
};
