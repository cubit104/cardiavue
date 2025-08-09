import React from 'react';
import logger from '../utils/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    logger.logComponentError(error, errorInfo, this.props.componentName || 'Unknown Component');
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // Log additional context if provided
    if (this.props.context) {
      logger.error('Error Boundary Context', this.props.context);
    }
  }

  handleRetry = () => {
    logger.userAction('Error Boundary Retry', { 
      component: this.props.componentName || 'Unknown' 
    });
    
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleReload = () => {
    logger.userAction('Error Boundary Reload', { 
      component: this.props.componentName || 'Unknown' 
    });
    
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry, this.handleReload);
      }

      // Default fallback UI
      return (
        <div style={styles.container}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h2 style={styles.title}>Oops! Something went wrong</h2>
            <p style={styles.message}>
              We're sorry, but something unexpected happened. This error has been logged 
              and our team will look into it.
            </p>
            
            {this.props.showDetails && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details</summary>
                <div style={styles.errorDetails}>
                  <strong>Error:</strong> {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      <br />
                      <strong>Component Stack:</strong>
                      <pre style={styles.stackTrace}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}
            
            <div style={styles.actions}>
              <button 
                onClick={this.handleRetry}
                style={styles.retryButton}
              >
                Try Again
              </button>
              <button 
                onClick={this.handleReload}
                style={styles.reloadButton}
              >
                Reload Page
              </button>
            </div>
            
            <p style={styles.helpText}>
              If this problem persists, please contact your system administrator.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  },
  errorCard: {
    maxWidth: '600px',
    width: '100%',
    padding: '2rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e1e5e9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  title: {
    color: '#d73a49',
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  message: {
    color: '#586069',
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
  },
  details: {
    textAlign: 'left',
    marginBottom: '1.5rem',
    backgroundColor: '#f6f8fa',
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    padding: '1rem',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#0366d6',
    marginBottom: '0.5rem',
  },
  errorDetails: {
    fontSize: '0.9rem',
    color: '#586069',
    lineHeight: '1.4',
  },
  stackTrace: {
    backgroundColor: '#f1f3f4',
    padding: '0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    overflow: 'auto',
    marginTop: '0.5rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  retryButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  reloadButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  helpText: {
    fontSize: '0.9rem',
    color: '#6a737d',
    margin: 0,
  },
};

export default ErrorBoundary;