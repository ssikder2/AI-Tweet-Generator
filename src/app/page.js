'use client'

import { use, useState } from 'react'
import Tweet from './Tweet'

export default function App() {
  const [inputText, setInputText] = useState('')
  const [style, setStyle] = useState('funny')
  const [isImage, setIsImage] = useState(false)
  const [generatedTweet, setGeneratedTweet] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTextChange = (event) => {
    setInputText(event.target.value)
  }

  const handleStyleChange = (event) => {
    setStyle(event.target.value)
  }

  const handleImageChange = (event) => {
    setIsImage(event.target.checked)
  }

  const generateTweet = async () => {
    if (!inputText) return

    setIsLoading(true)
    try {
      const response = await fetch('api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: inputText,
          style: style
        }),
      })

      const data = await response.json()
      if (data.error){
        throw new Error(data.error)
      }

      setGeneratedTweet(data.tweet)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate tweet')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div>
      <h1 className="header">Generate your next Tweet using AI</h1>
      <div className="generate-input">
        <h2>1. Write the topic you want to tweet about.</h2>
        <textarea 
            className="input-textarea" 
            value={inputText} 
            onChange={handleTextChange}
            placeholder="Announce my new product xyz..."
        />
        <h2>2. Select your style.</h2>
        <select 
          className="style-select"
          value={style}
          onChange={handleStyleChange}
        >
          <option value="funny">Funny</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="inspirational">Inspirational</option>
        </select>
        <div>
          <input 
            type="checkbox"
            className="isImage"
            checked={isImage}
            onChange={handleImageChange}
          />
          <label htmlFor="isImage">Generate an image with the tweet</label>
        </div>
        <button 
          className="generate-button"
          onClick={generateTweet}
          disabled={isLoading || !inputText}
        >
          {isLoading ? 'Generating...' : 'Generate Your Tweet'}
        </button>
      </div>
      {Boolean(generatedTweet) && <Tweet content={generatedTweet}/>}
    </div>
  )
}
