export const VERSION_ORDER = ["v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8-dev", "v8", "v9", "v9.1", "v9.2"];

export const QUESTIONS = {
  Q1: "\"We only use 10% of the brain\"",
  Q2: "Sleep vs. all-nighter before an exam",
  Q3: "Learning-styles myth",
  Q4: "Frustrated about math ability",
  Q5: "Prove Lagrange's theorem",
  Q6: "Mozart effect",
  "X-decl": "Declarative vs. procedural memory",
  "X-anx": "Exam anxiety",
  "X-syn": "Synaptic plasticity analogy",
  "X-teach": "Working-memory classroom activity",
  "X-adol": "Adolescent impulsivity",
  "X-lag": "Explain Lagrange's theorem",
};

// One representative run per version (v0 to v8).
export const MILESTONES = [
  { v: "v0", score: 2.5, q: "X-syn", note: "Initial setup; 2 of 5 agents took part" },
  { v: "v1", score: 3.0, q: "X-syn", note: "All 5 agents take part" },
  { v: "v2", score: 3.0, q: "X-syn", note: "Rule revision" },
  { v: "v3", score: 3.8, q: "X-syn", note: "Runs start ending cleanly" },
  { v: "v4", score: 3.8, q: "Q6", note: "Rule revision" },
  { v: "v5", score: 4.0, q: "X-adol", note: "Textbook revision (Mozart question: 3.8)" },
  { v: "v6", score: 4.0, q: "X-adol", note: "Rule revision" },
  { v: "v7", score: 3.8, q: "Q6", note: "Rule revision" },
  { v: "v8", score: 3.8, q: "Q6", note: "Rule revision" },
];
