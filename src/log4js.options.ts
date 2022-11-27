import { LOG4JS_LOGGER, LOG4JS_OPTIONS } from '@/constants/log4js';

export interface Log4jsOptionsFactory {
  createLog4jsOptions(): Promise<Log4jsOptions>;
}

export interface Log4jsOptions {
  name?: string;
}

export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';

export const getLog4jsOptionsToken = (
  name: string | symbol = LOG4JS_OPTIONS,
): string | symbol => {
  if (name === LOG4JS_OPTIONS) {
    return LOG4JS_OPTIONS;
  }

  if (!isSymbol(name)) {
    return `${name}_LOG4JS_OPTIONS`;
  }
};

export const getLog4jsLoggerToken = (
  name: string | symbol = LOG4JS_LOGGER,
): string | symbol => {
  if (name === LOG4JS_LOGGER) {
    return LOG4JS_LOGGER;
  }

  if (!isSymbol(name)) {
    return `${name}_LOG4JS_LOGGER`;
  }
};
