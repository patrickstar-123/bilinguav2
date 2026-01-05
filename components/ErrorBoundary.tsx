import { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-600 dark:text-red-400">
                    Oops! Something went wrong
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Don't worry, your progress is safe
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Message */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm font-mono text-red-800 dark:text-red-200 mb-2">
                  <strong>Error:</strong> {this.state.error?.message || 'Unknown error'}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="text-xs text-red-700 dark:text-red-300 mt-2">
                    <summary className="cursor-pointer font-bold mb-2">
                      Stack Trace (Development Only)
                    </summary>
                    <pre className="whitespace-pre-wrap overflow-auto max-h-48 bg-red-100 dark:bg-red-900/20 p-2 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              {/* What happened */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">What happened?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The application encountered an unexpected error. This is usually temporary and
                  can be fixed by refreshing the page.
                </p>
              </div>

              {/* What to do */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">What should I do?</h3>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Click "Try Again" below to reload this component</li>
                  <li>If the error persists, click "Go to Home" to restart</li>
                  <li>Clear your browser cache if problems continue</li>
                  <li>Your progress and data are safely stored</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </div>

              {/* Support Info */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>💡 Tip:</strong> If you keep seeing this error, try these steps:
                </p>
                <ul className="text-xs text-blue-700 dark:text-blue-300 mt-2 space-y-1 ml-4">
                  <li>• Refresh the page (Ctrl+R or Cmd+R)</li>
                  <li>• Clear browser cache (Ctrl+Shift+Delete)</li>
                  <li>• Check your internet connection</li>
                  <li>• Try using a different browser</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
