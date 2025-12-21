import React from 'react';
import { FaBug, FaRedo, FaTimes } from 'react-icons/fa';

class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      showFallback: true
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Only log error in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('Component Error caught by boundary:', error, errorInfo);
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleDismiss = () => {
    this.setState({ showFallback: false });
  };

  render() {
    if (this.state.hasError && this.state.showFallback) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
          <div className="flex items-start space-x-3">
            {/* Error Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <FaBug className="text-red-600 dark:text-red-400 text-sm" />
              </div>
            </div>

            {/* Error Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Component Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                This component encountered an error and couldn't render properly.
              </p>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                >
                  <FaRedo className="mr-1 text-xs" />
                  Retry
                </button>
                
                <button
                  onClick={this.handleDismiss}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <FaTimes className="mr-1 text-xs" />
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.hasError && !this.state.showFallback) {
      // Return null or a minimal fallback when dismissed
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary; 