import { Result } from 'antd';
import type { ErrorInfo } from 'react';
import React from 'react';

class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    console.warn('ErrorBoundary caught an error', error);
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // 这里可以添加错误上报逻辑
    console.warn('ErrorBoundary caught an error', error, errorInfo);
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
