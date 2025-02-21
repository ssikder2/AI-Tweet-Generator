import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge';

const rateLimit = new Map()
const RATE_LIMIT = 5
const TIME_WINDOW = 60 * 60 * 1000

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        
        const now = Date.now()
        const userRequests = rateLimit.get(ip) || []
        
        const recentRequests = userRequests.filter(time => time > now - TIME_WINDOW)
        
        if (recentRequests.length >= RATE_LIMIT) {
            return NextResponse.json(
                { error: 'Image Generation Rate limit exceeded. Please try again in an hour.' },
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

        const prompt = `Create a highly detailed, visually striking image that perfectly complements a tweet about ${topic}. 
                        The style should be ${style}, making it engaging, modern, and captivating. 
                        The image should evoke curiosity and emotion while maintaining a clean and aesthetically pleasing look. 
                        Avoid text overlays and unnecessary distractions—focus on compelling visuals that tell a story at a glance.`
        
        const response = await openai.images.generate({
            prompt: prompt,
            model: "dall-e-3",
            size: "1024x1024",
            quality: "hd",
            n: 1
        })
        const imageURL = response.data[0].url
        return NextResponse.json({ imageURL })
    } catch (error) {
        return Response.json({ error: error.message}, { status: 500 })
    }
}