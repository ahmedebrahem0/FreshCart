import api from './api';

export const authService = {
  // Login
  login: (credentials) => {
    return api.post('/auth/signin', credentials);
  },

  // Register
  register: (userData) => {
    return api.post('/auth/signup', userData);
  },

  // Forget Password
  forgetPassword: (email) => {
    return api.post('/auth/forgotPasswords', { email });
  },

  // Verify Reset Code
  verifyResetCode: (resetCode) => {
    return api.post('/auth/verifyResetCode', { resetCode });
  },

  // Reset Password
  resetPassword: (resetData) => {
    return api.put('/auth/resetPassword', resetData);
  },

  // Change Password
  changePassword: (passwordData) => {
    
    return api.put("/users/changeMyPassword",passwordData, {
          headers: { token:localStorage.getItem('tkn') },
        })
  },

  // Get User Profile
  getUserProfile: () => {
    return api.get('/user/profile');
  },

  // Update User Profile
  updateUserProfile: (userData) => {
    return api.put('/user/profile', userData);
  }
}; 