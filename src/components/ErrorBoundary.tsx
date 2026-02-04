/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */

import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
          <div className="max-w-2xl w-full glass-effect p-8 rounded-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/20 rounded-full">
                <AlertTriangle size={48} className="text-red-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-slate-300 mb-6">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-slate-800/50 rounded-lg text-left">
                <p className="text-sm font-mono text-red-400 mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-slate-400">
                    <summary className="cursor-pointer hover:text-slate-300">
                      Stack trace
                    </summary>
                    <pre className="mt-2 overflow-auto max-h-48">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
