import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
    try {
        const { topic, style } = await request.json()

        if (!topic || !style) {
            return NextResponse.json(
                { error: 'Topic and style are required' },
                { status: 400 }
            )
        }

        const prompt = `You are a copywritter who is an expert at writing engaging statements.
                        You will write a tweet about ${topic} in a ${style} style.
                        You always start with a strong hook to capture attention. Your posts are less than 280 characters long,
                        and they are written in short concise and catchy sentences. 
                        You NEVER write hashtags or emojis. Don't use dashes.`
        
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt}],
            model: "gpt-4o-mini"
        })
        return Response.json({ tweet: completion.choices[0].message.content })
    } catch (error) {
        return Response.json({ error: error.message}, { status: 500 })
    }
}

