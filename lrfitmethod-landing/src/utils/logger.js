/**
 * Comprehensive Logging System
 * Tracks: events, errors, performance, user actions, token usage
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4,
};

const LOG_COLORS = {
  DEBUG: '\x1b[36m', // cyan
  INFO: '\x1b[32m', // green
  WARN: '\x1b[33m', // yellow
  ERROR: '\x1b[31m', // red
  CRITICAL: '\x1b[35m', // magenta
  RESET: '\x1b[0m',
};

class Logger {
  constructor(namespace = 'App') {
    this.namespace = namespace;
    this.logs = [];
    this.currentLevel = LOG_LEVELS.DEBUG;
    this.enableConsole = true;
    this.enableStorage = true;
    this.maxLogs = 1000;
  }

  setLevel(level) {
    this.currentLevel = LOG_LEVELS[level] || LOG_LEVELS.INFO;
  }

  _format(level, message, data) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS[level];
    const reset = LOG_COLORS.RESET;

    return {
      timestamp,
      level,
      namespace: this.namespace,
      message,
      data,
      formatted: `${color}[${timestamp}] [${level}] [${this.namespace}] ${message}${reset}`,
    };
  }

  _log(level, message, data = {}) {
    if (LOG_LEVELS[level] < this.currentLevel) return;

    const logEntry = this._format(level, message, data);

    if (this.enableConsole) {
      console.log(logEntry.formatted, data);
    }

    this.logs.push(logEntry);

    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    if (this.enableStorage) {
      this._saveToStorage();
    }

    return logEntry;
  }

  debug(message, data) {
    return this._log('DEBUG', message, data);
  }

  info(message, data) {
    return this._log('INFO', message, data);
  }

  warn(message, data) {
    return this._log('WARN', message, data);
  }

  error(message, data) {
    return this._log('ERROR', message, data);
  }

  critical(message, data) {
    return this._log('CRITICAL', message, data);
  }

  // Performance tracking
  startTimer(label) {
    return performance.now();
  }

  endTimer(label, startTime) {
    const duration = performance.now() - startTime;
    this.info(`Timer: ${label}`, { duration: `${duration.toFixed(2)}ms` });
    return duration;
  }

  // Track user actions
  trackEvent(eventName, eventData = {}) {
    const eventLog = {
      type: 'EVENT',
      eventName,
      eventData,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };

    this.logs.push(eventLog);

    // Send to Meta Pixel if available
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, eventData);
    }

    return eventLog;
  }

  // Track API calls
  trackApiCall(method, url, statusCode, duration, tokensCost = 0) {
    this.info(`API: ${method} ${url}`, {
      statusCode,
      duration: `${duration}ms`,
      tokensCost,
    });
  }

  // Track token usage
  trackTokens(usage) {
    const { inputTokens, outputTokens, model = 'claude-haiku' } = usage;
    const totalTokens = inputTokens + outputTokens;

    // Pricing (updated for 2025)
    const pricing = {
      'claude-opus': { input: 15, output: 45 },
      'claude-sonnet': { input: 3, output: 15 },
      'claude-haiku': { input: 0.8, output: 4 },
    };

    const rates = pricing[model] || pricing['claude-haiku'];
    const cost = (inputTokens * rates.input + outputTokens * rates.output) / 1_000_000;

    this.info('Token Usage', {
      model,
      inputTokens,
      outputTokens,
      totalTokens,
      costUSD: `$${cost.toFixed(4)}`,
    });

    return { totalTokens, cost };
  }

  // Export logs
  export() {
    return {
      namespace: this.namespace,
      exportedAt: new Date().toISOString(),
      totalLogs: this.logs.length,
      logs: this.logs,
    };
  }

  exportJson() {
    return JSON.stringify(this.export(), null, 2);
  }

  exportCsv() {
    const logs = this.logs.filter((log) => log.level);
    if (logs.length === 0) return 'No logs to export';

    const headers = ['Timestamp', 'Level', 'Message', 'Data'];
    const rows = logs.map((log) => [
      log.timestamp,
      log.level,
      log.message,
      JSON.stringify(log.data || {}),
    ]);

    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  }

  // Storage management
  _saveToStorage() {
    if (typeof localStorage === 'undefined') return;

    try {
      const key = `logger_${this.namespace}`;
      localStorage.setItem(key, JSON.stringify(this.logs.slice(-100))); // Keep last 100
    } catch (e) {
      console.warn('Could not save logs to localStorage', e);
    }
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return;

    try {
      const key = `logger_${this.namespace}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load logs from localStorage', e);
    }
  }

  clear() {
    this.logs = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(`logger_${this.namespace}`);
    }
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      namespace: this.namespace,
      summary: {
        totalLogs: this.logs.length,
        byLevel: {},
      },
      errors: [],
      performance: [],
      events: [],
    };

    this.logs.forEach((log) => {
      if (log.level) {
        report.summary.byLevel[log.level] = (report.summary.byLevel[log.level] || 0) + 1;

        if (log.level === 'ERROR' || log.level === 'CRITICAL') {
          report.errors.push(log);
        }
      }

      if (log.message?.includes('Timer:')) {
        report.performance.push(log);
      }

      if (log.type === 'EVENT') {
        report.events.push(log);
      }
    });

    return report;
  }
}

// Create singleton instance
export const logger = new Logger('LRFitMethod');

// Auto-track unhandled errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logger.error('Uncaught Error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', {
      reason: event.reason?.message || event.reason,
      stack: event.reason?.stack,
    });
  });
}

export default Logger;
