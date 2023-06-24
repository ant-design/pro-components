import { Result } from 'antd';
import type { ErrorInfo } from 'react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="error"
          title="Something went wrong."
          extra={this.state.errorInfo}
        />
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
