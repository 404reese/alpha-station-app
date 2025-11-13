# AI-Powered Experiment Generation

This feature allows teachers to automatically generate step-by-step programming experiments using Google's Gemini AI.

## Setup

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Configure Environment Variables**
   - Create a `.env.local` file in the root directory
   - Add your API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Restart Development Server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## How It Works

### 1. Teacher Creates Experiment
- Navigate to any subject page
- Click "New Experiment"
- Fill in:
  - **Title**: Topic of the experiment (e.g., "Binary Search Algorithm")
  - **Description**: Expected outcomes or learning goals
  - **Language**: Programming language (Python, JavaScript, Java, etc.)
- Click "Generate with AI"

### 2. AI Generates Experiment
The system sends a prompt to Gemini AI with the following structure:
- Topic from the teacher
- Description/expected outcome
- Programming language
- Instructions to create incremental steps with:
  - Clear learning goals
  - Starter code with TODOs
  - Complete solution code
  - Test cases with inputs and expected outputs

### 3. Teacher Reviews
- The AI generates a structured JSON response
- Teacher is redirected to a review page showing:
  - Experiment title
  - Language and total steps
  - Each step with:
    - Step number and title
    - Instructions
    - Starter code (with TODOs for students)
    - Solution code
    - Test cases (input/output pairs)
- Steps are collapsible for easy review

### 4. Accept or Reject
- **Accept**: Saves the experiment to the subject
- **Reject**: Goes back to try again with different inputs

## API Response Format

The Gemini AI returns JSON in this format:

\`\`\`json
{
  "experiment_title": "Binary Search Implementation",
  "language": "python",
  "total_steps": 3,
  "steps": [
    {
      "step_no": 1,
      "title": "Understanding the Problem",
      "instruction": "Implement the basic structure...",
      "starter_code": "def binary_search(arr, target):\n    # TODO: implement",
      "solution_code": "def binary_search(arr, target):\n    left = 0\n    right = len(arr) - 1\n    ...",
      "test_cases": [
        {
          "input": "[1, 2, 3, 4, 5], 3",
          "expected_output": "2"
        }
      ]
    }
  ]
}
\`\`\`

## Features

- **Progressive Learning**: Steps build on each other incrementally
- **Automatic Test Cases**: Each step includes validation tests
- **Starter Code**: Students get skeleton code with TODOs
- **Complete Solutions**: Teachers can see the full working code
- **Multi-Language Support**: Works with Python, JavaScript, Java, C++, etc.

## Error Handling

The system handles:
- Missing API key
- API request failures
- Invalid JSON responses
- Network errors

Errors are displayed to the teacher with clear messages.

## File Structure

\`\`\`
app/
  api/
    generate-experiment/
      route.ts              # API endpoint for Gemini AI
  dashboard/
    subject/
      [id]/
        review/
          page.tsx          # Review generated experiment
components/
  dashboard/
    CreateExperimentModal.tsx  # Modal with AI integration
\`\`\`
