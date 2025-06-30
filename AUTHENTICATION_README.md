# Authentication Middleware Setup

This project now includes a comprehensive authentication system with middleware protection for your routes.

## 🚀 Features

- **JWT-based Authentication**: Secure token-based authentication
- **Route Protection**: Middleware automatically protects specified routes
- **Automatic Redirects**: Unauthenticated users are redirected to login
- **User Context**: User information is available in protected API routes
- **Logout Functionality**: Secure logout with cookie cleanup

## 📁 Files Created/Modified

### New Files:
- `middleware.js` - Main authentication middleware
- `src/lib/utils/auth.js` - Authentication utility functions
- `src/app/api/logout/route.js` - Logout API endpoint
- `AUTHENTICATION_README.md` - This documentation

### Modified Files:
- `src/app/login/page.jsx` - Added redirect handling
- `src/app/AdminComponents/TopBarDashboard.jsx` - Added logout button
- `src/app/api/blog/route.js` - Added authentication check example

## 🔧 How It Works

### 1. Middleware Configuration

The middleware (`middleware.js`) automatically runs on all routes and:

- **Checks if the route is protected** (defined in `protectedRoutes` array)
- **Validates JWT tokens** from cookies
- **Redirects unauthenticated users** to login with redirect parameter
- **Adds user information** to request headers for API routes

### 2. Protected Routes

The following routes are automatically protected:
- `/admin/*` - All admin pages
- `/api/blog` - Blog API endpoints
- `/api/contact` - Contact API endpoints
- `/api/email` - Email API endpoints
- `/api/sendMail` - Email sending API

### 3. Public Routes

These routes are accessible without authentication:
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/about` - About page
- `/contact` - Contact page
- `/blog` - Blog page
- `/api/login` - Login API
- `/api/register` - Registration API

## 🛠️ Usage

### In API Routes

To access user information in your API routes:

```javascript
import { getUserFromRequest, isAuthenticated } from "@/lib/utils/auth";

export async function POST(request) {
    // Check if user is authenticated
    const user = getUserFromRequest(request);
    if (!user) {
        return NextResponse.json(
            { success: false, message: "Authentication required" },
            { status: 401 }
        );
    }

    // Use user information
    console.log('User ID:', user.id);
    console.log('User Email:', user.email);

    // Your API logic here...
}
```

### Adding New Protected Routes

To protect additional routes, add them to the `protectedRoutes` array in `middleware.js`:

```javascript
const protectedRoutes = [
  '/admin',
  '/api/blog',
  '/api/contact',
  '/api/email',
  '/api/sendMail',
  '/api/new-protected-route', // Add new routes here
];
```

### Adding New Public Routes

To make routes public, add them to the `publicRoutes` array:

```javascript
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/blog',
  '/api/login',
  '/api/register',
  '/api/public-endpoint', // Add new public routes here
];
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials → JWT token created → Token stored in httpOnly cookie
2. **Protected Route Access**: Middleware checks token → Validates JWT → Allows/denies access
3. **API Requests**: User info added to headers → Available in API routes
4. **Logout**: Token cleared from cookie → User redirected to login

## 🚨 Security Features

- **HttpOnly Cookies**: Tokens stored securely in httpOnly cookies
- **JWT Verification**: Server-side token validation
- **Automatic Cleanup**: Invalid tokens are automatically cleared
- **Redirect Handling**: Users are redirected back to intended page after login
- **CSRF Protection**: SameSite cookie attribute prevents CSRF attacks

## 🔧 Environment Variables

Make sure you have these environment variables set:

```env
JWT_SECRET=your_secure_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

## 🧪 Testing

1. **Try accessing `/admin` without logging in** - Should redirect to login
2. **Login with valid credentials** - Should redirect to admin dashboard
3. **Try accessing protected API routes** - Should return 401 without authentication
4. **Click logout button** - Should clear session and redirect to login

## 📝 Notes

- The middleware runs on all routes except static files and images
- JWT tokens expire after 1 day
- Invalid tokens are automatically cleared and users redirected to login
- User information is available in all protected API routes via request headers

## 🐛 Troubleshooting

### Common Issues:

1. **Middleware not working**: Ensure `middleware.js` is in the root directory
2. **JWT errors**: Check that `JWT_SECRET` environment variable is set
3. **Redirect loops**: Verify that login/register routes are in `publicRoutes`
4. **API 401 errors**: Ensure the route is in `protectedRoutes` and user is authenticated

### Debug Mode:

To debug middleware issues, check the browser console and server logs for:
- Token verification errors
- Redirect URLs
- Authentication status

---

Your authentication system is now fully set up and ready to use! 🎉 