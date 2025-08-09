// Comprehensive logging system for CardiaVue application
class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Keep only the last 1000 logs
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.enableConsole = true;
    this.enableLocalStorage = true;
    
    // Initialize log storage
    this.initializeStorage();
    
    // Log application start
    this.info('CardiaVue Application Initialized', { timestamp: new Date().toISOString() });
  }

  initializeStorage() {
    try {
      const existingLogs = localStorage.getItem('cardiaVue_logs');
      if (existingLogs) {
        this.logs = JSON.parse(existingLogs).slice(-this.maxLogs);
      }
    } catch (error) {
      console.warn('Failed to load existing logs from localStorage:', error);
    }
  }

  createLogEntry(level, message, data = {}, error = null) {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      data,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null,
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId()
    };

    return logEntry;
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('cardiaVue_sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('cardiaVue_sessionId', sessionId);
    }
    return sessionId;
  }

  addLog(logEntry) {
    this.logs.push(logEntry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Save to localStorage
    if (this.enableLocalStorage) {
      try {
        localStorage.setItem('cardiaVue_logs', JSON.stringify(this.logs));
      } catch (error) {
        console.warn('Failed to save logs to localStorage:', error);
      }
    }

    // Console output in development
    if (this.enableConsole && this.isDevelopment) {
      const consoleMethod = this.getConsoleMethod(logEntry.level);
      consoleMethod(`[${logEntry.level}] ${logEntry.message}`, logEntry.data);
    }
  }

  getConsoleMethod(level) {
    switch (level) {
      case 'ERROR':
        return console.error;
      case 'WARN':
        return console.warn;
      case 'INFO':
        return console.info;
      case 'DEBUG':
        return console.debug;
      default:
        return console.log;
    }
  }

  // Public logging methods
  error(message, data = {}, error = null) {
    const logEntry = this.createLogEntry('error', message, data, error);
    this.addLog(logEntry);
    
    // Send critical errors to a remote service in production
    if (!this.isDevelopment) {
      this.sendToRemoteService(logEntry);
    }
  }

  warn(message, data = {}) {
    const logEntry = this.createLogEntry('warn', message, data);
    this.addLog(logEntry);
  }

  info(message, data = {}) {
    const logEntry = this.createLogEntry('info', message, data);
    this.addLog(logEntry);
  }

  debug(message, data = {}) {
    if (this.isDevelopment) {
      const logEntry = this.createLogEntry('debug', message, data);
      this.addLog(logEntry);
    }
  }

  // Specialized logging methods
  userAction(action, details = {}) {
    this.info(`User Action: ${action}`, {
      type: 'user_action',
      action,
      ...details
    });
  }

  authentication(event, username, success = true, details = {}) {
    const level = success ? 'info' : 'warn';
    this[level](`Authentication ${event}: ${username}`, {
      type: 'authentication',
      event,
      username,
      success,
      ...details
    });
  }

  navigation(from, to, method = 'unknown') {
    this.info(`Navigation: ${from} → ${to}`, {
      type: 'navigation',
      from,
      to,
      method
    });
  }

  apiCall(endpoint, method, statusCode, duration, requestData = {}) {
    const level = statusCode >= 400 ? 'error' : 'info';
    this[level](`API Call: ${method} ${endpoint} - ${statusCode}`, {
      type: 'api_call',
      endpoint,
      method,
      statusCode,
      duration,
      requestData
    });
  }

  performance(metric, value, context = {}) {
    this.info(`Performance: ${metric}`, {
      type: 'performance',
      metric,
      value,
      ...context
    });
  }

  deviceInteraction(deviceType, action, patientId, details = {}) {
    this.info(`Device Interaction: ${action} on ${deviceType}`, {
      type: 'device_interaction',
      deviceType,
      action,
      patientId,
      ...details
    });
  }

  // Utility methods
  getAllLogs() {
    return [...this.logs];
  }

  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level.toUpperCase());
  }

  getLogsByType(type) {
    return this.logs.filter(log => log.data.type === type);
  }

  getLogsByTimeRange(startTime, endTime) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    
    return this.logs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime >= start && logTime <= end;
    });
  }

  exportLogs(format = 'json') {
    const logs = this.getAllLogs();
    
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else if (format === 'csv') {
      const headers = ['timestamp', 'level', 'message', 'type', 'url'];
      const csvData = [
        headers.join(','),
        ...logs.map(log => {
          return [
            log.timestamp,
            log.level,
            `"${log.message.replace(/"/g, '""')}"`,
            log.data.type || '',
            log.url
          ].join(',');
        })
      ];
      return csvData.join('\n');
    }
    
    return logs;
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('cardiaVue_logs');
    this.info('Logs cleared by user');
  }

  async sendToRemoteService(logEntry) {
    // In a real application, you would send logs to a remote logging service
    // like LogRocket, Sentry, or your own logging endpoint
    try {
      // Example implementation:
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // });
      
      console.info('Log entry would be sent to remote service:', logEntry);
    } catch (error) {
      console.error('Failed to send log to remote service:', error);
    }
  }

  // Error boundary helper
  logComponentError(error, errorInfo, componentName) {
    this.error(`React Component Error in ${componentName}`, {
      type: 'component_error',
      componentName,
      errorInfo
    }, error);
  }

  // Network monitoring
  logNetworkError(url, method, error) {
    this.error(`Network Error: ${method} ${url}`, {
      type: 'network_error',
      url,
      method
    }, error);
  }

  // Form validation logging
  logFormValidation(formName, field, validationError) {
    this.warn(`Form Validation Error: ${formName}.${field}`, {
      type: 'form_validation',
      formName,
      field,
      validationError
    });
  }
}

// Create singleton instance
const logger = new Logger();

// Global error handler
window.addEventListener('error', (event) => {
  logger.error('Global JavaScript Error', {
    type: 'global_error',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  }, event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled Promise Rejection', {
    type: 'unhandled_rejection'
  }, event.reason);
});

export default logger;