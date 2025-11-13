import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error('❌ Gemini API key is missing. Please set GEMINI_API_KEY in .env.local');
}

const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
    })
  : null;

export async function POST(request: NextRequest) {
  if (!geminiApiKey || !ai) {
    return NextResponse.json(
      { error: 'Gemini API Key is not configured properly.' },
      { status: 500 }
    );
  }

  try {
    const { topic, description, language } = await request.json();

    const prompt = `You are an AI assistant that helps teachers design step-by-step programming experiments for students. Inputs from teacher are:
A topic of experiment: ${topic}
A short description or expected outcome: ${description}
The programming language to use: ${language}

Your task is to break the experiment into logical steps that teach progressively.
Each step should:
- Have a clear learning goal or instruction
- Provide a code skeleton (starter_code) with TODOs or blanks for students to fill
- Provide the full working solution (solution_code)
- Contain 2–5 test cases that can be run automatically to verify correctness
- Include the input and expected output for each test case

Return the result as valid JSON only, following this schema:
{
  "experiment_title": "<string>",
  "language": "<python|java|c|cpp|js>",
  "total_steps": <number>,
  "steps": [
    {
      "step_no": <integer>,
      "title": "<string>",
      "instruction": "<string>",
      "starter_code": "<string>",
      "solution_code": "<string>",
      "test_cases": [
        {
          "input": "<string>",
          "expected_output": "<string>"
        }
      ]
    }
  ]
}

Guidelines:
- Keep each step small and incremental.
- Starter code should compile/run but have missing logic.
- Test cases must be minimal but accurate.
- The final step should represent the complete implementation.
- Return ONLY valid JSON, no additional text or markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
    });

    const generatedText = response.text;

    if (!generatedText) {
      return NextResponse.json(
        { error: 'No content generated from AI' },
        { status: 500 }
      );
    }

    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    const experimentData = JSON.parse(cleanedText);
    return NextResponse.json(experimentData);

  } catch (error) {
    console.error('Error generating experiment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
