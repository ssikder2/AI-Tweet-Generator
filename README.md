# AI Tweet Generator

An AI-powered tweet generator built with Next.js and React that creates engaging tweets using ChatGPT and generates matching images using DALL-E.

## Features

- Generate tweets in different styles (funny, casual, professional, inspirational)
- Optional AI image generation to accompany tweets
- Twitter-like interface
- One-click sharing to Twitter
- Rate limiting to prevent API abuse

## Tech Stack

- Next.js 14
- React
- OpenAI API (GPT-4 and DALL-E 3)
- Font Awesome for icons

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Enter a topic you want to tweet about
2. Select your preferred writing style
3. Optionally check the box to generate a matching image
4. Click "Generate Your Tweet"
5. Click the Tweet button to share directly to Twitter

## API Rate Limits

- Tweet generation: 5 requests per hour
- Image generation: 5 requests per hour

## Environment Variables

The following environment variables are required:

- `OPENAI_API_KEY`: Your OpenAI API key
