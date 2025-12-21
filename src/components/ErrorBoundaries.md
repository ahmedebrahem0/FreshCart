# Error Boundaries Documentation

This document explains the error handling system implemented in the Fresh-Cart application.

## Overview

The application uses multiple layers of error boundaries to provide a robust error handling experience:

1. **ErrorBoundary** - Main application error boundary
2. **ApiErrorBoundary** - API-specific error handling
3. **ComponentErrorBoundary** - Component-level error handling
4. **useErrorHandler** - Hook for handling API errors
5. **ErrorDisplay** - Component for displaying errors

## Components

### 1. ErrorBoundary
Main error boundary that catches all JavaScript errors in the component tree.

**Features:**
- Catches all JavaScript errors
- Beautiful error UI with retry functionality
- Technical details toggle for developers
- Go to home functionality
- Dark mode support

**Usage:**
```jsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

### 2. ApiErrorBoundary
Specialized error boundary for API-related errors.

**Features:**
- Detects different types of API errors (network, server, auth, etc.)
- Retry mechanism with counter
- Different UI for different error types
- Progress bar showing retry attempts

**Error Types:**
- Network errors (connection issues)
- Server errors (500, 502, etc.)
- Not found errors (404)
- Authorization errors (401, 403)
- Maximum retries reached

**Usage:**
```jsx
import ApiErrorBoundary from './components/ApiErrorBoundary';

<ApiErrorBoundary>
  <ComponentThatMakesApiCalls />
</ApiErrorBoundary>
```

### 3. ComponentErrorBoundary
Lightweight error boundary for individual components.

**Features:**
- Inline error display
- Retry and dismiss options
- Minimal UI impact
- Fallback prop support

**Usage:**
```jsx
import ComponentErrorBoundary from './components/ComponentErrorBoundary';

<ComponentErrorBoundary fallback={<div>Component failed</div>}>
  <RiskyComponent />
</ComponentErrorBoundary>
```

## Hooks

### useErrorHandler
Hook for handling API errors with toast notifications.

**Features:**
- Automatic error type detection
- Toast notifications
- Error state management
- Context tracking
- Error filtering by type

**Usage:**
```jsx
import { useErrorHandler } from './hooks/useErrorHandler';

const MyComponent = () => {
  const { handleError, errors, clearError } = useErrorHandler();

  const fetchData = async () => {
    try {
      const response = await api.get('/data');
      return response.data;
    } catch (error) {
      handleError(error, 'fetchData');
    }
  };

  return (
    <div>
      {/* Your component */}
      <ErrorDisplay 
        errors={errors} 
        onClearError={clearError} 
      />
    </div>
  );
};
```

## Components

### ErrorDisplay
Component for displaying error messages in a beautiful UI.

**Features:**
- Different styles for different error types
- Auto-dismiss functionality
- Clear all errors option
- Timestamp display
- Context information

**Usage:**
```jsx
import ErrorDisplay from './components/ErrorDisplay';

<ErrorDisplay 
  errors={errors} 
  onClearError={clearError}
  onClearAll={clearAllErrors}
/>
```

## Error Types

The system recognizes and handles different types of errors:

### API Errors
- **400** - Bad Request (warning)
- **401** - Unauthorized (warning)
- **403** - Forbidden (error)
- **404** - Not Found (info)
- **422** - Validation Error (warning)
- **429** - Too Many Requests (warning)
- **500** - Server Error (error)

### Network Errors
- Connection issues
- Timeout errors
- CORS errors

### Component Errors
- JavaScript runtime errors
- Render errors
- State errors

## Best Practices

### 1. Use Appropriate Error Boundaries
- Use `ErrorBoundary` for the entire app
- Use `ApiErrorBoundary` for API-heavy components
- Use `ComponentErrorBoundary` for risky components

### 2. Handle Errors Gracefully
```jsx
// Good
try {
  const data = await api.get('/data');
  setData(data);
} catch (error) {
  handleError(error, 'fetchData');
}

// Bad
const data = await api.get('/data'); // No error handling
```

### 3. Provide User-Friendly Messages
```jsx
// Good
errorMessage = 'Unable to load products. Please try again.';

// Bad
errorMessage = 'TypeError: Cannot read property of undefined';
```

### 4. Use Error Context
```jsx
handleError(error, 'ProductDetails.fetchProduct');
handleError(error, 'Cart.addToCart');
handleError(error, 'Auth.login');
```

## Configuration

### Toast Notifications
Error notifications are automatically shown using react-toastify:

```jsx
toast[errorType](errorMessage, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
```

### Retry Configuration
- Maximum retries: 3
- Retry delay: Immediate
- Retry counter: Visible to user

## Testing Error Boundaries

To test error boundaries, you can create components that throw errors:

```jsx
const TestErrorComponent = () => {
  throw new Error('Test error');
};

// Wrap in error boundary
<ErrorBoundary>
  <TestErrorComponent />
</ErrorBoundary>
```

## Monitoring and Logging

All errors are logged to the console for debugging:

```javascript
console.error('Error caught by boundary:', error, errorInfo);
```

For production, you can add error reporting services:

```javascript
// Example with Sentry
import * as Sentry from '@sentry/react';

componentDidCatch(error, errorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
```

## Benefits

1. **Better User Experience** - Users see friendly error messages instead of crashes
2. **Graceful Degradation** - App continues to work even when parts fail
3. **Easy Debugging** - Detailed error information for developers
4. **Consistent Error Handling** - Standardized approach across the app
5. **Retry Mechanisms** - Automatic recovery from temporary failures 