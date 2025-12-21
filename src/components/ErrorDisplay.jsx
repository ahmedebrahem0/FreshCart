import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const ErrorDisplay = ({ errors, onClearError, onClearAll }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      case 'success':
        return 'text-green-800 dark:text-green-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {/* Clear All Button */}
      {errors.length > 1 && (
        <div className="flex justify-end">
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Error Messages */}
      {errors.map((error) => (
        <div
          key={error.id}
          className={`${getBgColor(error.type)} border rounded-lg p-4 shadow-lg transform transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(error.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${getTextColor(error.type)}`}>
                    {error.message}
                  </p>
                  {error.context && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Context: {error.context}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => onClearError(error.id)}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay; 