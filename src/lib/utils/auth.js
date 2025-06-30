/**
 * Utility function to get user information from request headers
 * This function extracts user data that was set by the middleware
 */
export function getUserFromRequest(request) {
  const userId = request.headers.get('x-user-id');
  const userEmail = request.headers.get('x-user-email');
  
  if (!userId || !userEmail) {
    return null;
  }
  
  return {
    id: userId,
    email: userEmail
  };
}

/**
 * Utility function to check if user is authenticated
 * Returns true if user data is present in headers
 */
export function isAuthenticated(request) {
  return getUserFromRequest(request) !== null;
} 