import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

app.post('/api/writing-help', async (req, res) => {
  try {
    const { type } = req.body

    console.log('Writing help requested:', type)

    const instructions = {
      prompt: `
Give the user one short question or idea that can help them start writing about their own personal experience.

Do not write a journal entry.
Do not write a paragraph for the user.
Do not answer the prompt.
Keep the response to one or two sentences.
`,

      exercise: `
Give the user one short creative writing exercise for their personal diary.

The exercise should make the user write about their own experience.
Do not write the journal entry for them.
Keep it short and easy to understand.
`,

      question: `
Give the user one short reflective question for their personal diary.

The question should encourage the user to think about their own experience.
Do not answer the question.
Do not write a journal entry.
Keep it short.
`
    }

    if (!instructions[type]) {
      return res.status(400).json({
        error: 'Invalid writing help type.'
      })
    }

    console.log('Sending request to Gemini...')

    let response

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: instructions[type]
        })

        break

      } catch (error) {
        if (error.status === 503 && attempt < 3) {
          console.log(`Gemini busy. Retrying... (${attempt}/3)`)

          await new Promise(resolve => setTimeout(resolve, 2000))
        } else {
          throw error
        }
      }
    }

    console.log('Gemini response received:', response.text)

    res.json({
      suggestion: response.text
    })

  } catch (error) {
    console.error('Gemini error:', error)

    res.status(500).json({
      error: error.message || 'Could not generate writing help.'
    })
  }
})

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API is running"
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Gemini server running on port ${PORT}`);
});
