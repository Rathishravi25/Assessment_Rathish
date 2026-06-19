export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  error(message: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
  }

  debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message));
    }
  }
}

export const logger = new Logger();
