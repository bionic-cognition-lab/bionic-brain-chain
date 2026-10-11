// Role-level descriptions only; the rest is withheld until after the
// inter-group contest. The built-in biases are the
// platform's fixed role contracts, which every group can see.
export const STATIONS = [
  { key: "PFC", color: "--s1", name: "Commander", region: "Prefrontal Cortex",
    job: "Receives the question, breaks it into goals and constraints, and starts the pipeline. It does not answer the question itself.",
    bias: "Tends to act as the sole commander, answering on behalf of other roles." },
  { key: "AMY", color: "--s2", name: "Emotion Radar", region: "Amygdala",
    job: "Assesses the emotion and salience of the question, without diagnosing or offering solutions.",
    bias: "Systematically overestimates risk, making non-urgent things sound urgent." },
  { key: "HPC", color: "--s3", name: "Memory Bank", region: "Hippocampus",
    job: "Retrieves relevant passages from its micro-textbook and reports what it could not find.",
    bias: "Tends to fabricate when evidence is missing, saying \"probably\" instead of \"can't recall\"." },
  { key: "DMN", color: "--s4", name: "Association Engine", region: "Default Mode Network",
    job: "Generates analogies and associations, marked as unverified.",
    bias: "Systematically treats associations as facts, saying \"it is\" instead of \"it might be\"." },
  { key: "Verifier", color: "--s5", name: "Truth Gatekeeper", region: "Knowledge Verifier",
    job: "Separates facts, inferences, analogies, and guesses, and writes the final answer.",
    bias: "Tends to block ideas prematurely, treating \"not found\" as \"wrong\"." },
];
