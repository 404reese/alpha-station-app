# PDF Upload System

## Overview
Teachers can now upload PDF documents directly instead of providing external URLs. PDFs are stored locally in the `/public/uploads/experiments/` folder.

## Features

### Upload API (`/api/upload-pdf`)
- **Endpoint**: `POST /api/upload-pdf`
- **Max file size**: 10MB
- **Allowed format**: PDF only
- **File naming**: Timestamp + sanitized filename (e.g., `1731542400000_experiment-guide.pdf`)
- **Storage location**: `/public/uploads/experiments/`
- **Returns**: `{ success: true, url: '/uploads/experiments/filename.pdf', fileName: 'filename.pdf' }`

### Validation
- ✅ File type validation (PDF only)
- ✅ File size validation (max 10MB)
- ✅ Automatic directory creation
- ✅ Unique filename generation (prevents overwrites)

### Teacher Form Updates
- **Upload area**: Drag-and-drop style upload zone
- **File preview**: Shows uploaded PDF with name and delete option
- **Loading state**: Displays spinner during upload
- **Error handling**: Clear error messages for validation failures

### User Flow
1. Teacher clicks "Upload PDF" area or the upload button
2. Selects PDF file from their computer
3. File is validated and uploaded to server
4. PDF is stored in `/public/uploads/experiments/`
5. Form stores the public URL (e.g., `/uploads/experiments/123456_guide.pdf`)
6. Teacher can remove uploaded PDF and re-upload if needed

## File Structure
```
public/
  uploads/
    experiments/
      .gitkeep
      1731542400000_python-basics.pdf
      1731542401000_java-functions.pdf
```

## Security Considerations
- Only PDF files are accepted
- File size is limited to 10MB
- Filenames are sanitized to prevent path traversal
- Directory is created with restricted permissions

## Note
The `/public/uploads/` directory is excluded from git via `.gitignore`. Uploaded files are stored locally only and won't be committed to the repository.
