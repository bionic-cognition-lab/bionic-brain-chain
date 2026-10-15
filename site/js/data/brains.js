// Brains built after the main chain, with their own agents. Role-level
// descriptions and scores only; rules, textbook pages, and chain design are
// withheld until after the inter-group contest.
export const BRAINS = [
  {
    id: "sponsorship",
    name: "Sponsorship-Proposal Brain",
    built: "2026-10-16",
    purpose: "Answers one practical question from a brain-science angle: how a student association can write an extracurricular-activity proposal that makes professors, whom the students know little about, and the university's extracurricular office eager to fund it.",
    stations: [
      { key: "PFC", color: "--s1", role: "Reads the funders: infers what professors value from what they publicly do, and why approval in words does not predict funding." },
      { key: "AMY", color: "--s2", role: "Marks what attracts funders and what deters them, such as rewards beyond expectation, price pain, loss aversion, and trust." },
      { key: "HPC", color: "--s3", role: "Finds evidence that the activity benefits students, with the limits of each piece of evidence." },
      { key: "DMN", color: "--s4", role: "Turns the evidence into concrete proposal ideas, each with a risk, marked as unverified." },
      { key: "Verifier", color: "--s5", role: "Checks every idea and writes the final proposal guide, including an outline and warnings against overclaiming." },
    ],
    question: "How can a student association write an extracurricular-activity proposal that makes professors and the university's extracurricular office want to fund it generously, when the students know little about the professors?",
    runs: [
      { label: "Run 1", score: 4.0, grounding: 100, note: "First design; the final answer used little of what earlier stations found" },
      { label: "Run 2", score: 4.0, grounding: 100, note: "Revision" },
      { label: "Run 3", score: 4.0, grounding: 96, note: "Revision; final answer cut off" },
      { label: "Run 4", score: 4.0, grounding: 100, note: "Revision; complete answer drawing on all five stations" },
      { label: "Run 5", score: 4.0, grounding: 100, note: "Design variant; recommended version" },
      { label: "Run 6", score: 4.0, grounding: 100, note: "Design variant" },
    ],
  },
  {
    id: "first-principles",
    name: "First-Principles Brain",
    built: "2026-10-16",
    purpose: "Takes any question and decomposes it from first principles instead of answering it directly: it discards every assumption that cannot survive doubt and rebuilds an answer only from the basic facts that remain.",
    stations: [
      { key: "PFC", color: "--s1", role: "Restates the real question, lists every hidden assumption, and splits the question into sub-questions until they cannot be split further." },
      { key: "AMY", color: "--s2", role: "Tags where each assumption comes from: emotion, a mental shortcut, arguing to persuade, or fast intuition." },
      { key: "HPC", color: "--s3", role: "Sorts each assumption into fact, definition, value, or unknown, and lists the basic facts of the problem." },
      { key: "DMN", color: "--s4", role: "Rebuilds an answer step by step from the basic facts only, plus one route that assumes a discarded premise was false." },
      { key: "Verifier", color: "--s5", role: "Checks every rebuild step and gives a verdict on each assumption, a conclusion with its confidence, and the asker's next step." },
    ],
    question: "Two test questions: the claim that people use only 10% of their brain, and whether to transfer to a popular computer-science major for better job prospects.",
    runs: [
      { label: "Run 1", score: 3.5, grounding: 100, note: "10% question; first design stopped early, before the last two stations" },
      { label: "Run 2", score: 4.0, grounding: 100, note: "10% question; all five stations; every assumption in the question rejected" },
      { label: "Run 3", score: 4.0, grounding: 100, note: "Major-transfer question" },
      { label: "Run 4", score: 4.0, grounding: 100, note: "Major-transfer question after a revision; basic facts now about the decision itself" },
    ],
    footnote: "Two further runs stopped on a platform-side model error, which the platform does not score; they are not listed.",
  },
];
