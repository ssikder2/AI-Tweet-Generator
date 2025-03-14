import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge';

const rateLimit = new Map()
const RATE_LIMIT = 10
const TIME_WINDOW = 60 * 60 * 1000

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        
        const now = Date.now()
        const userRequests = rateLimit.get(ip) || []
        
        const recentRequests = userRequests.filter(time => time > now - TIME_WINDOW)
        
        if (recentRequests.length >= RATE_LIMIT) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again in an hour.' },
                { status: 429 }
            )
        }

        recentRequests.push(now)
        rateLimit.set(ip, recentRequests)

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

