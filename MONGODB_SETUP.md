# 🚀 Alpha Station - MongoDB User Management Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js installed
- MongoDB running on `localhost:27017`

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/alpha-station-dev
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start MongoDB
Make sure MongoDB is running:

**Windows:**
```cmd
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Verify MongoDB is running:**
```bash
mongosh
# You should see MongoDB shell prompt
```

### 5. Start the Application
```bash
npm run dev
```

### 6. Create Superadmin Account

**Option A: Web Interface (Recommended)**
1. Visit: `http://localhost:3000/setup`
2. Fill in the form:
   - Email: `admin@alphastation.com`
   - Password: `admin123` (minimum 6 characters)
   - First Name: `Super`
   - Last Name: `Admin`
3. Click "Create Superadmin"
4. You'll be redirected to login

**Option B: Command Line**
```bash
npm run setup:admin
# Follow the prompts
```

### 7. Login
1. Visit: `http://localhost:3000/login`
2. Enter your superadmin credentials
3. You'll be redirected to `/admin` dashboard

## User Roles

### 🛡️ Superadmin
- **Access**: `/admin`
- **Powers**:
  - Create teachers and students
  - View all users
  - Activate/deactivate accounts
  - Delete users
  - Manage system

### 👨‍🏫 Teacher
- **Access**: `/dashboard`
- **Powers**:
  - Create experiments
  - Upload PDFs
  - Add video tutorials
  - Generate content with AI

### 🎓 Student
- **Access**: `/student`
- **Powers**:
  - Browse experiments
  - Complete coding challenges
  - Track progress

## Creating Users as Superadmin

1. Login as superadmin
2. Navigate to `/admin`
3. Click "Create User" button
4. Fill in the form:
   - **Email**: user@example.com
   - **Password**: password123
   - **Role**: Teacher or Student
   - **First Name**: (optional)
   - **Last Name**: (optional)
5. Click "Create User"

## Example Users for Testing

### Superadmin
```
Email: admin@alphastation.com
Password: admin123
```

### Teacher Example
```
Email: teacher@alphastation.com
Password: teacher123
Role: Teacher
```

### Student Example
```
Email: student@alphastation.com
Password: student123
Role: Student
```

## Database Structure

### Collection: `users`
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  password: "$2a$10$...", // hashed
  role: "superadmin" | "teacher" | "student",
  firstName: "John",
  lastName: "Doe",
  isActive: true,
  lastLogin: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## API Testing

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alphastation.com","password":"admin123"}'
```

### Create User (Superadmin only)
```bash
curl -X POST http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "role": "teacher",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### List All Users
```bash
curl http://localhost:3000/api/admin/users \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

### List Only Teachers
```bash
curl http://localhost:3000/api/admin/users?role=teacher \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

## Troubleshooting

### ❌ MongoDB Connection Error
**Problem**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
```bash
# Check if MongoDB is running
mongosh

# If not, start it
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

### ❌ Setup Page Says "Already Complete"
**Problem**: Setup already done, but you want to reset

**Solution**:
```bash
mongosh
use alpha-station-dev
db.users.deleteMany({})  # Delete all users
# OR
db.dropDatabase()  # Delete entire database
```

### ❌ Authentication Not Working
**Problem**: Login fails or redirects incorrectly

**Solutions**:
1. Clear browser cookies
2. Check `.env.local` file exists
3. Restart dev server: `npm run dev`
4. Verify MongoDB connection

### ❌ Can't Create Users as Superadmin
**Problem**: "Unauthorized" error

**Solution**:
1. Make sure you're logged in as superadmin
2. Check browser console for errors
3. Verify cookie is being sent with requests

## Security Notes

### Production Checklist
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use environment-specific `.env` files
- [ ] Enable HTTPS
- [ ] Set secure cookies (`secure: true`)
- [ ] Implement rate limiting
- [ ] Add password complexity requirements
- [ ] Enable account lockout after failed attempts
- [ ] Implement email verification
- [ ] Add two-factor authentication

### Password Security
- Passwords are hashed with bcrypt (10 rounds)
- Minimum 6 characters (increase in production)
- Never stored in plain text
- JWT tokens expire after 7 days

## Resetting Everything

To start completely fresh:

```bash
# Stop the dev server (Ctrl+C)

# Drop the database
mongosh
use alpha-station-dev
db.dropDatabase()
exit

# Delete .env.local (optional)
rm .env.local  # or del .env.local on Windows

# Recreate .env.local with your settings
# Restart dev server
npm run dev

# Visit http://localhost:3000/setup
```

## File Structure
```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts       # Login endpoint
│   │   ├── logout/route.ts      # Logout endpoint
│   │   └── me/route.ts          # Get current user
│   ├── admin/
│   │   └── users/route.ts       # User CRUD operations
│   └── setup/route.ts           # Initial setup
├── admin/page.tsx               # Superadmin dashboard
├── login/page.tsx               # Login page
├── setup/page.tsx               # Setup page
├── dashboard/page.tsx           # Teacher dashboard
└── student/page.tsx             # Student dashboard

contexts/
└── AuthContext.tsx              # Auth state management

models/
└── User.ts                      # User schema

lib/
└── mongodb.ts                   # Database connection

scripts/
└── create-superadmin.js         # CLI setup script

docs/
└── AUTH_SYSTEM.md               # Detailed documentation
```

## Next Steps

After setting up authentication:

1. **Test the system**
   - Create a teacher account
   - Create a student account
   - Test logging in with each role

2. **Customize**
   - Update branding and colors
   - Add more user fields if needed
   - Implement password reset

3. **Integrate with existing features**
   - Link experiments to teacher accounts
   - Track student progress in database
   - Add user profiles

4. **Deploy**
   - Set up MongoDB Atlas for production
   - Update environment variables
   - Enable security features

## Support

For issues or questions:
1. Check `docs/AUTH_SYSTEM.md` for detailed documentation
2. Review console logs for error messages
3. Verify MongoDB is running and accessible
4. Check that all dependencies are installed

---

**Database**: `alpha-station-dev`  
**Default Port**: `3000`  
**MongoDB Port**: `27017`
