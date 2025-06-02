import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { embed } from "ai"
import { NextResponse } from 'next/server';

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const runtime = 'edge';
export const maxDuration = 300;
const systemMessage = `You are a expert in One Piece and you love to make theories about the show. you love to speak as zoro roronoa.`;

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

function findTopMatches(queryEmbedding: number[], db: any[], topK = 3) {
  return db
    .map((item) => ({
      ...item,
      score: cosineSimilarity(queryEmbedding, item.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

const db: any[] = []

export async function POST(request: Request) {

    const { messages } = await request.json();
    const openRouterModel = openrouter('deepseek/deepseek-chat-v3-0324');

    const lastMessageUser = messages[messages.length - 1]?.role === 'user' ? messages[messages.length - 1] : null;
    const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: lastMessageUser?.content || '',
    })

    db.push({ id: db.length + 1, embedding, content: lastMessageUser?.content || '' });
    const matches = findTopMatches(embedding, db);
    const context = matches.map(match => match.content).join('\n');

    const result = await streamText({
        model: openRouterModel,
        temperature: 1,
        messages,
        system: systemMessage + `\n\nHere is some context from previous messages:\n${context}`,
    });

    return result.toDataStreamResponse()
}