# Quick Setup Guide

## 1. Install Dependencies

### Install the Google GenAI SDK:
```bash
npm install @google/genai
```

### Or install all dependencies:
```bash
npm install
```

## 2. Set Up Gemini API Key

### Get Your API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Add to Environment:
Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## 3. Start Development Server
```bash
npm run dev
```

## 4. Test the Feature

1. Navigate to `http://localhost:3000/dashboard`
2. Click on any subject
3. Click "New Experiment"
4. Fill in:
   - Title: "Binary Search"
   - Description: "Learn to implement binary search algorithm"
   - Language: Python
5. Click "Generate with AI"
6. Wait for AI to generate (5-10 seconds)
7. Review the generated steps
8. Accept or Reject

## Troubleshooting

### "Gemini API key not configured"
- Make sure `.env.local` exists in the project root
- Check the key name is exactly `GEMINI_API_KEY`
- Restart the dev server after creating `.env.local`

### "Failed to generate experiment from AI"
- Check your API key is valid
- Ensure you have internet connection
- Check the API quota limits on Google AI Studio

### Loading spinner doesn't stop
- Check browser console for errors
- Verify the API endpoint is accessible at `/api/generate-experiment`
- Check network tab for failed requests

## Features Overview

✅ AI-powered experiment generation using Gemini
✅ Step-by-step breakdown of programming concepts
✅ Starter code with TODOs for students
✅ Complete solution code for teachers
✅ Automatic test case generation
✅ Review and approve/reject generated content
✅ Support for multiple programming languages
✅ Numbered experiment steps
✅ Collapsible step details
✅ Clean, modern UI with dark/light theme support
