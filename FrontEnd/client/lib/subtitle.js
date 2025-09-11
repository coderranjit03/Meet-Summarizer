function parseSRT(input) {
  return input
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map(block => block.replace(/^\d+\n/m, ""))
    .map(block => block.replace(/\d\d:\d\d:\d\d,\d\d\d --> .*\n/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseVTT(input) {
  return input
    .replace(/\r/g, "")
    .replace(/^WEBVTT.*\n/, "")
    .split(/\n\n+/)
    .map(block => block.replace(/\d\d:\d\d:\d\d\.\d\d\d --> .*\n/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export { parseSRT, parseVTT };
