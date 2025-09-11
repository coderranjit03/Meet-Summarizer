const STOPWORDS = new Set([
  "a","an","and","the","is","are","was","were","be","been","to","of","in","for","on","at","by","with","as","that","this","it","from","or","but","if","then","so","than","too","very","can","could","should","would","will","just","we","you","they","i","he","she","them","our","us","your","their","not","do","does","did","have","has","had"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function splitSentences(text) {
  return text
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
}

function wordFrequencies(text) {
  const freq = new Map();
  for (const w of tokenize(text)) {
    if (STOPWORDS.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  // normalize
  let max = 1;
  for (const v of freq.values()) max = Math.max(max, v);
  for (const [k, v] of freq) freq.set(k, v / max);
  return freq;
}

function summarizeText(text, opts = {}) {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return "";
  const freq = wordFrequencies(text);
  const scored = sentences.map((s, idx) => {
    const words = tokenize(s);
    const score = words.reduce((acc, w) => acc + (freq.get(w) || 0), 0) / Math.max(words.length, 1);
    const lengthPenalty = Math.abs(words.length - 20) / 20; // prefer ~20 words
    return { idx, s: s.trim(), score: score - 0.2 * lengthPenalty };
  });
  scored.sort((a, b) => b.score - a.score);
  const ratio = Math.min(Math.max(opts.ratio ?? 0.25, 0.05), 1);
  const pick = Math.max(3, Math.min(Math.ceil(sentences.length * ratio), opts.maxSentences || 8));
  const top = scored.slice(0, pick).sort((a, b) => a.idx - b.idx);
  let joined = top.map(x => x.s).join(" ");
  if (opts.tone === "concise") {
    joined = top.map(x => `• ${x.s.replace(/\s+/g, " ")}`).join("\n");
  } else if (opts.tone === "detailed") {
    joined = top.map(x => x.s).join("\n\n");
  }
  return joined;
}

function extractActionItems(text) {
  const sentences = splitSentences(text);
  const patterns = /(will|should|need to|follow up|assign|due|deadline|prepare|schedule|plan|implement|review|update|send|create|fix|investigate|deploy|test)\b/i;
  return sentences.filter(s => patterns.test(s)).map(s => s.trim());
}

function extractDecisions(text) {
  const sentences = splitSentences(text);
  const patterns = /(decided|agreed|approved|chose|selected|concluded|finalized|go with|opt for)/i;
  return sentences.filter(s => patterns.test(s)).map(s => s.trim());
}

export { summarizeText, extractActionItems, extractDecisions };
