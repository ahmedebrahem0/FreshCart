import React from 'react';
import { FaWifi, FaServer, FaExclamationCircle } from 'react-icons/fa';

class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorType: null,
      retryCount: 0,
      maxRetries: 3
    };
  }

  static getDerivedStateFromError(error) {
    // Determine error type based on error message or properties
    let errorType = 'unknown';
    
    if (error.message?.includes('Network Error') || error.message?.includes('fetch')) {
      errorType = 'network';
    } else if (error.message?.includes('500') || error.message?.includes('Internal Server Error')) {
      errorType = 'server';
    } else if (error.message?.includes('404') || error.message?.includes('Not Found')) {
      errorType = 'notFound';
    } else if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      errorType = 'unauthorized';
    } else if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      errorType = 'forbidden';
    }

    return { hasError: true, errorType };
  }

  componentDidCatch(error, errorInfo) {
    // Only log error in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error caught by boundary:', error, errorInfo);
    }
    
    // Increment retry count
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1
    }));
  }

  handleRetry = () => {
    if (this.state.retryCount < this.state.maxRetries) {
      this.setState({ 
        hasError: false, 
        errorType: null 
      });
    } else {
      // If max retries reached, show permanent error
      this.setState({ 
        hasError: true, 
        errorType: 'maxRetries' 
      });
    }
  };

  handleGoBack = () => {
    window.history.back();
  };

  getErrorContent = () => {
    const { errorType, retryCount, maxRetries } = this.state;

    switch (errorType) {
      case 'network':
        return {
          icon: <FaWifi className="text-3xl text-orange-500" />,
          title: 'Connection Error',
          message: 'Please check your internet connection and try again.',
          color: 'orange'
        };
      
      case 'server':
        return {
          icon: <FaServer className="text-3xl text-red-500" />,
          title: 'Server Error',
          message: 'Our servers are experiencing issues. Please try again later.',
          color: 'red'
        };
      
      case 'notFound':
        return {
          icon: <FaExclamationCircle className="text-3xl text-blue-500" />,
          title: 'Not Found',
          message: 'The requested resource could not be found.',
          color: 'blue'
        };
      
      case 'unauthorized':
        return {
          icon: <FaExclamationCircle className="text-3xl text-yellow-500" />,
          title: 'Unauthorized',
          message: 'Please log in to access this resource.',
          color: 'yellow'
        };
      
      case 'forbidden':
        return {
          icon: <FaExclamationCircle className="text-3xl text-purple-500" />,
          title: 'Access Denied',
          message: 'You don\'t have permission to access this resource.',
          color: 'purple'
        };
      
      case 'maxRetries':
        return {
          icon: <FaExclamationCircle className="text-3xl text-gray-500" />,
          title: 'Maximum Retries Reached',
          message: `We've tried ${maxRetries} times but couldn't load the data. Please try again later.`,
          color: 'gray'
        };
      
      default:
        return {
          icon: <FaExclamationCircle className="text-3xl text-red-500" />,
          title: 'Something Went Wrong',
          message: 'An unexpected error occurred. Please try again.',
          color: 'red'
        };
    }
  };

  render() {
    if (this.state.hasError) {
      const errorContent = this.getErrorContent();
      const { retryCount, maxRetries } = this.state;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              {errorContent.icon}
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {errorContent.title}
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {errorContent.message}
            </p>

            {/* Retry Counter */}
            {retryCount > 0 && (
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Attempt {retryCount} of {maxRetries}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(retryCount / maxRetries) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {retryCount < maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Try Again
                </button>
              )}
              
              <button
                onClick={this.handleGoBack}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Go Back
              </button>
            </div>

            {/* Additional Help */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If the problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary; 
