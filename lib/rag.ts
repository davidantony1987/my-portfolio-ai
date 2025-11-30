import fs from "fs";
import path from "path";
import { embed } from "./embeddings";

let vectorStore: { text: string; embedding: number[] }[] | null = null;

export async function getVectorStore() {
  if (vectorStore) return vectorStore;

  const file = fs.readFileSync(path.join(process.cwd(), "data/resume.md"), "utf-8");
  const chunks = file.split("\n");

  vectorStore = [];

  for (const c of chunks) {
    vectorStore.push({
      text: c,
      embedding: await embed(c),
    });
  }

  return vectorStore;
}

export async function getRelevantText(query: string, store: any[]) {
  const queryEmbedding = await embed(query);

  function cosineSim(a: number[], b: number[]) {
    const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dot / (magA * magB);
  }

  const scored = store
    .map((chunk) => ({
      text: chunk.text,
      score: cosineSim(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return scored.map((s) => s.text).join("\n");
}
