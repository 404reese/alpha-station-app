# Experiment Storage & Access Control Implementation

## Overview
This implementation stores AI-generated experiments in MongoDB with teacher ownership and collaborator access control. Only the teacher who created an experiment and their collaborators can view and manage experiments within their subjects.

## Changes Made

### 1. Updated Experiment Model (`models/Experiment.ts`)
**Added Fields:**
- `steps`: Array of experiment steps with test cases (complete AI-generated structure)
- `pdfUrl`: Optional PDF document URL
- `videoUrl`: Optional YouTube video URL

**New Interfaces:**
- `ITestCase`: Input and expected output for each test case
- `IExperimentStep`: Complete step structure with starter code, solution, and test cases
- `IExperiment`: Full experiment with all metadata

**Schema Structure:**
```typescript
{
  title: String (required)
  description: String (required)
  language: String (required)
  subjectId: String (required, indexed)
  teacherId: String (required, indexed)
  steps: [ExperimentStep] (required, min 1 step)
  pdfUrl: String (optional)
  videoUrl: String (optional)
  timestamps: true
}
```

### 2. Experiment API Routes (`app/api/experiments/route.ts`)

#### GET `/api/experiments?subjectId=<id>`
**Access Control:**
- Verifies user is authenticated
- Checks if user is subject owner OR collaborator
- Returns 403 if unauthorized

**Logic:**
1. Fetches subject by ID
2. Gets current user's email
3. Checks if `subject.teacherId === userId` OR `user.email in subject.collaborators`
4. Returns all experiments for the subject if authorized

#### POST `/api/experiments`
**Access Control:**
- Only teachers can create experiments
- Must be subject owner OR collaborator

**Required Fields:**
- `title`, `description`, `language`, `subjectId`, `steps[]`
- Optional: `pdfUrl`, `videoUrl`

**Logic:**
1. Validates user is a teacher
2. Checks subject ownership/collaboration
3. Creates experiment with `teacherId` set to current user
4. Returns created experiment with all details

#### DELETE `/api/experiments?id=<id>`
**Access Control:**
- Only the experiment creator (original teacherId) can delete
- Collaborators can view but NOT delete

### 3. Single Experiment Endpoint (`app/api/experiments/[id]/route.ts`)

#### GET `/api/experiments/:id`
**Access Control:**
- Teachers/owners: Full access
- Collaborators: Full access
- Students: Can view (for completing experiments)

**Returns:**
- Complete experiment with all steps, test cases, and metadata
- Used by student experiment page to load interactive coding challenges

### 4. Review Page Updates (`app/dashboard/subject/[id]/review/page.tsx`)

**handleAccept Function:**
- Saves AI-generated experiment to MongoDB
- Includes complete step structure with test cases
- Associates experiment with:
  - `subjectId`: Which classroom/subject
  - `teacherId`: Creator's user ID
  - `steps`: Full AI-generated content
  - `pdfUrl`, `videoUrl`: Optional resources

**Features:**
- Loading state while saving
- Error handling with user feedback
- Redirects to subject page on success

### 5. Student Experiment Page (`app/student/experiment/[id]/page.tsx`)

**Updated to fetch from API:**
- Replaced mock data with API calls to `/api/experiments/:id`
- Shows loading spinner while fetching
- Handles errors gracefully
- Transforms API response to match existing component interface

## Access Control Summary

### Who Can See Experiments?

| Role | Owner | Collaborator | Other Teachers | Students |
|------|-------|--------------|----------------|----------|
| **View Experiments** | ✅ | ✅ | ❌ | ✅* |
| **Create Experiments** | ✅ | ✅ | ❌ | ❌ |
| **Edit Experiments** | ✅ | ✅ | ❌ | ❌ |
| **Delete Experiments** | ✅ | ❌ | ❌ | ❌ |

*Students can view experiments to complete them, but only through the subject they have access to.

### Data Flow

1. **Teacher Creates Experiment:**
   - Uses CreateExperimentModal
   - AI generates steps → Review page
   - Teacher accepts → Saves to MongoDB with teacherId

2. **Teacher/Collaborator Views Experiments:**
   - Navigates to subject page
   - GET `/api/experiments?subjectId=X`
   - API checks ownership/collaboration
   - Returns only authorized experiments

3. **Student Completes Experiment:**
   - Clicks on experiment from subject
   - GET `/api/experiments/:id`
   - Loads complete experiment with steps and test cases
   - Interactive coding interface

## Database Indexes

- `{ subjectId: 1, createdAt: -1 }`: Fast queries for subject experiments
- `{ teacherId: 1 }`: Fast queries for teacher's experiments

## Security Features

1. **Authentication Required:** All routes verify JWT token
2. **Role-Based Access:** Teachers can create, students can view
3. **Ownership Verification:** Subject ownership checked on every request
4. **Collaborator Support:** Email-based collaborator list in subjects
5. **Creator-Only Delete:** Only experiment creator can delete

## Future Enhancements

- Add update/edit experiment endpoint
- Implement student progress tracking
- Add experiment analytics for teachers
- Support for private vs. public experiments
- Bulk operations for experiments
