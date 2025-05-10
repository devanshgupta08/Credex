import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key is missing from the environment variables' });
  }

  try {
    const response = await fetch('https://api.gemini.com/v1/ai', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ answer: data.answer });
  } catch (error) {
    console.error('Error fetching Gemini AI response:', error);
    res.status(500).json({ error: 'There was an error fetching the response from Gemini AI.' });
  }
}
