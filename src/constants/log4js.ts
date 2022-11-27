import * as path from 'path';
import * as fs from 'fs';
import { Configuration } from 'log4js';

const LOG_PATH = path.resolve(__dirname, '../../run/logs');

// try to create a folder for savubg logs
if (!fs.existsSync(LOG_PATH)) {
  fs.mkdirSync(LOG_PATH, { recursive: true });
}

export const LOG4JS_OPTIONS = Symbol('NEST_LOG4JS_OPTIONS');
export const LOG4JS_LOGGER = Symbol('NEST_LOG4JS_LOGGER');

export const LOG4JS_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '%[[%X{appName}](%z) [%p] [%d{yyyy-MM-dd hh:mm:ss}]:%] %m',
};

export const LOG4JS_NO_COLOUR_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '[%X{appName}](%z) [%p] [%d{yyyy-MM-dd hh:mm:ss}]: %m',
};

export const LOG4JS_NO_COLOUR_ERROR_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '[%X{appName}](%z) [%p] [%d{yyyy-MM-dd hh:mm:ss}]: %m\n%s',
};

export const LOG4JS_CONFIG: Configuration = {
  appenders: {
    stdout: {
      type: 'stdout',
      layout: LOG4JS_LAYOUT,
      enableCallStack: true,
    },
    file: {
      type: 'file',
      filename: path.resolve(LOG_PATH, './all.log'),
      maxLogSize: 100 * 1024 * 1024, // maxLogSize use bytes ad unit
      backups: 14, // default use 5 so 1KB file size total rotating
      layout: LOG4JS_NO_COLOUR_LAYOUT,
    },
    error: {
      type: 'file',
      filename: path.resolve(LOG_PATH, './error.log'),
      enableCallStack: true,
      layout: LOG4JS_NO_COLOUR_ERROR_LAYOUT,
    },
    'error-filter': {
      type: 'logLevelFilter',
      appender: 'error',
      level: 'error',
    },
  },
  categories: {
    default: {
      enableCallStack: true,
      appenders: ['stdout', 'file', 'error-filter'],
      level: 'debug',
    },
    production: {
      enableCallStack: true,
      appenders: ['stdout', 'file', 'error-filter'],
      level: 'info',
    },
  },
};
