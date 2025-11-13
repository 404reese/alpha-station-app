# Login System Guide - Alpha Station

## ✅ System Status

Your login system is **FULLY IMPLEMENTED** and ready to use! The application includes:

- ✅ Email/Password authentication with MongoDB
- ✅ Bcrypt password hashing for security
- ✅ JWT token-based session management
- ✅ Role-based access control (superadmin, teacher, student)
- ✅ Beautiful, modern login UI with dark theme
- ✅ Auto-redirect based on user role
- ✅ Protected routes and authentication context

## 🚀 Getting Started

### 1. Ensure MongoDB is Running

Make sure you have MongoDB running locally or have a connection string ready:

```bash
# Check if MongoDB is running (if local)
mongosh
```

Your MongoDB URI is configured in `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/alpha-station-dev
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Your First User (Superadmin)

Run the setup script to create a superadmin account:

```bash
node scripts/create-superadmin.js
```

This will prompt you for:
- Email address
- Password (minimum 6 characters)
- First Name (optional)
- Last Name (optional)

**Note:** According to your `.env.local` comments, you have:
- Superadmin: `superadmin@alphastation.app` / `admin123`
- Teacher: `teacher@astn.app` / `teacher`

### 4. Start the Application

```bash
npm run dev
```

### 5. Login

Navigate to: `http://localhost:3000/login`

- Enter your email and password
- Click "Login"
- You'll be automatically redirected based on your role:
  - **Superadmin** → `/admin`
  - **Teacher** → `/dashboard`
  - **Student** → `/student`

## 🎨 Login Page Features

The login page maintains a beautiful aesthetic with:

- **Dark Theme**: Gray-900 gradient background with glass-morphism effect
- **Orange Accent**: Orange-500 color for branding and focus states
- **Responsive Design**: Mobile-friendly layout
- **Loading States**: Spinner animation during login
- **Error Handling**: Clear error messages displayed
- **Form Validation**: Required fields and email validation
- **Security**: Password hidden by default

## 🔐 Authentication Flow

1. **User submits credentials** → Login page (`/login`)
2. **API validates credentials** → `/api/auth/login`
   - Checks if user exists in MongoDB
   - Verifies password using bcrypt
   - Checks if account is active
   - Updates last login timestamp
3. **JWT token generated** → Stored in HTTP-only cookie
4. **User data stored** → AuthContext state
5. **Auto-redirect** → Based on user role

## 📁 Key Files

- **Login Page**: `app/login/page.tsx`
- **Login API**: `app/api/auth/login/route.ts`
- **User Model**: `models/User.ts`
- **Auth Context**: `contexts/AuthContext.tsx`
- **MongoDB Config**: `lib/mongodb.ts`
- **Setup Script**: `scripts/create-superadmin.js`

## 🔧 User Management

### Create Additional Users

You can create users through:

1. **Web Interface**: Navigate to `/setup` (first-time setup)
2. **Admin Panel**: Use `/admin` to manage users
3. **Direct MongoDB**: Use MongoDB shell or GUI tools

### User Schema

```typescript
{
  email: string (unique, required)
  password: string (hashed, required, min 6 chars)
  role: 'superadmin' | 'teacher' | 'student'
  firstName: string (optional)
  lastName: string (optional)
  isActive: boolean (default: true)
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}
```

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt rounds (10)
- **JWT Tokens**: 7-day expiration
- **HTTP-Only Cookies**: XSS protection
- **Secure Flag**: Enabled in production
- **SameSite**: Strict CSRF protection
- **Password Selection**: Hidden by default in queries
- **Active Status Check**: Inactive accounts cannot login

## 🎯 Role-Based Routing

The system automatically redirects users after login:

| Role | Redirect URL | Purpose |
|------|-------------|---------|
| `superadmin` | `/admin` | Admin dashboard & user management |
| `teacher` | `/dashboard` | Teacher dashboard & content management |
| `student` | `/student` | Student portal & experiments |

## 🐛 Troubleshooting

### "Connection failed" error
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env.local`

### "Invalid credentials" error
- Verify email/password are correct
- Check user exists in database
- Ensure account is active (`isActive: true`)

### Token issues
- Clear cookies and try again
- Check `JWT_SECRET` is set in `.env.local`

## 📝 Testing the System

1. **Create a test user:**
   ```bash
   node scripts/create-superadmin.js
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Navigate to login:**
   ```
   http://localhost:3000/login
   ```

4. **Login with your credentials**

5. **Verify redirect** based on your role

## 🎉 You're All Set!

Your login system is production-ready with MongoDB authentication. The beautiful UI is already in place, and all security measures are implemented.

Need to customize? All files are well-documented and follow Next.js 15 best practices.
