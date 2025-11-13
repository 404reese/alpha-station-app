# Experiment Data Storage Verification

## Current Implementation

The system is **already configured** to store complete experiment data including all steps, test cases, starter code, and solutions in MongoDB.

### What Gets Stored

When you accept an AI-generated experiment, the following complete structure is saved:

```typescript
{
  title: string,
  description: string,
  language: string,
  subjectId: string,
  teacherId: string,
  steps: [
    {
      step_no: number,
      title: string,
      instruction: string,
      starter_code: string,        // What students see initially
      solution_code: string,        // The complete solution
      test_cases: [
        {
          input: string,
          expected_output: string
        }
      ]
    }
  ],
  pdfUrl?: string,
  videoUrl?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### How to Verify Data is Saved

1. **Console Logging**: Added console logs to track:
   - Number of steps being sent to API
   - Preview of first step
   - Server receiving the data
   - Confirmation after saving

2. **Check MongoDB**:
   - Open MongoDB Compass or your database viewer
   - Navigate to your database → `experiments` collection
   - Click on any experiment document
   - You should see the complete `steps` array with all nested data

3. **API Testing**:
   - Create an experiment using AI generation
   - Accept it on the review page
   - Check browser console for logs like:
     - `💾 Saving experiment with X steps`
     - `📝 First step preview: {...}`
   - Check server/terminal logs for:
     - `📥 Received experiment data: {...}`
     - `✅ Experiment created successfully with X steps`

### Viewing Saved Data

#### For Teachers:
- Click on any experiment in subject page
- View complete experiment with all steps unlocked
- URL: `/dashboard/subject/{id}/experiment/{expId}`

#### For Students:
- Access experiment from student dashboard
- Interactive coding interface with step-by-step progression
- URL: `/student/experiment/{id}`

### API Endpoints

1. **Create Experiment**: `POST /api/experiments`
   - Saves complete experiment with all steps
   - Requires: title, description, language, subjectId, steps[]

2. **Get Single Experiment**: `GET /api/experiments/{id}`
   - Returns complete experiment including all steps
   - Used by both teacher and student views

3. **List Experiments**: `GET /api/experiments?subjectId={id}`
   - Returns summary (without steps for performance)
   - For listing experiments in subject page

### Data Flow

```
AI Generation → Review Page → Accept → API (POST) → MongoDB
                   ↓
            All steps with:
            - Instructions
            - Starter code
            - Solution code  
            - Test cases
```

### Troubleshooting

If you're not seeing the steps:

1. **Check the API response** in browser DevTools Network tab
2. **Verify MongoDB** directly - the steps array should be populated
3. **Check console logs** for the number of steps being saved
4. **Test with a new experiment** - older ones might be from before the update

### Database Schema

The Mongoose schema includes:
- `ExperimentStepSchema` - Defines structure for each step
- `TestCaseSchema` - Defines structure for test cases
- Both are embedded in the main `ExperimentSchema`
- Uses `{ _id: false }` to avoid creating IDs for subdocuments

All data is stored in a **single collection** (`experiments`) as embedded documents, which is efficient for this use case since:
- Steps are always accessed together with the experiment
- No need for separate queries
- Better performance for reading complete experiment data
