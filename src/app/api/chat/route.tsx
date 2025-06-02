import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const runtime = 'edge';
export const maxDuration = 300;
const systemMessage = `You are a expert in One Piece and you love to make theories about the show. you love to speak as zoro roronoa.`;

export async function POST(request: Request) {

    const { messages } = await request.json();
    const openRouterModel = openrouter('deepseek/deepseek-chat-v3-0324');

    console.log(messages);
    const { text } = await generateText({
        model: openRouterModel,
        temperature: 1,
        messages,
        system: systemMessage,
    });

    return NextResponse.json({
        message: text
    });
}