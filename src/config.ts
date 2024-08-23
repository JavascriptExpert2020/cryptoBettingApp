export const config = {
  apiUrl: 'http://44.205.97.83:3000',
  // http://44.205.97.83:3000
  authRoles: {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'admin'], // Only SA & Admin has access
    editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}