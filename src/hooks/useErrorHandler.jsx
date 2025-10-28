import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  const [errors, setErrors] = useState([]);

  const handleError = useCallback((error, context = '') => {
    // Only log error in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in ${context}:`, error);
    }

    let errorMessage = 'An unexpected error occurred';
    let errorType = 'error';

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Bad request. Please check your input.';
          errorType = 'warning';
          break;
        case 401:
          errorMessage = 'Please log in to continue.';
          errorType = 'warning';
          break;
        case 403:
          errorMessage = 'You don\'t have permission to perform this action.';
          errorType = 'error';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          errorType = 'info';
          break;
        case 422:
          errorMessage = data?.message || 'Validation error. Please check your input.';
          errorType = 'warning';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          errorType = 'warning';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          errorType = 'error';
          break;
        default:
          errorMessage = data?.message || `Server error (${status})`;
          errorType = 'error';
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network error. Please check your connection.';
      errorType = 'error';
    } else if (error.message) {
      // Other errors
      errorMessage = error.message;
      errorType = 'error';
    }

    // Add error to state
    const newError = {
      id: Date.now(),
      message: errorMessage,
      type: errorType,
      context,
      timestamp: new Date().toISOString(),
      originalError: error
    };

    setErrors(prev => [...prev, newError]);

    // Show toast notification
    toast[errorType](errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    return newError;
  }, []);

  const clearError = useCallback((errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getErrorsByType = useCallback((type) => {
    return errors.filter(error => error.type === type);
  }, [errors]);

  const hasErrors = errors.length > 0;
  const hasErrorType = useCallback((type) => {
    return errors.some(error => error.type === type);
  }, [errors]);

  return {
    errors,
    handleError,
    clearError,
    clearAllErrors,
    getErrorsByType,
    hasErrors,
    hasErrorType
  };
}; 