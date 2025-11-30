import { NextResponse } from "next/server";
import { getVectorStore, getRelevantText } from "@/lib/rag";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { question } = await req.json();

  const store = await getVectorStore();
  const relevantText = await getRelevantText(question, store);

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You answer based on David Antony's resume." },
      { role: "user", content: `Resume data:\n${relevantText}` },
      { role: "user", content: `Question: ${question}` },
    ],
  });

  return NextResponse.json({
    answer: completion.choices?.[0]?.message?.content,
  });
}
