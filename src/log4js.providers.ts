import * as log4js from 'log4js';
import { FactoryProvider } from '@nestjs/common';
import {
  getLog4jsLoggerToken,
  getLog4jsOptionsToken,
  Log4jsOptions,
} from './log4js.options';
import { Log4jsLogger } from './log4js.logger';
import { parseNestModuleCallStack } from './parser';
import { LOG4JS_CONFIG } from '@/constants/log4js';

export type Log4jsLoggerFactoryProvider = FactoryProvider<
  Log4jsLogger | Promise<Log4jsLogger>
>;
export type Log4jsOptionsFactoryProvider = FactoryProvider<
  Log4jsOptions | Promise<Log4jsOptions>
>;

export const createLog4jsLogger = (
  name: string,
): Log4jsLoggerFactoryProvider => ({
  provide: getLog4jsLoggerToken(name),
  inject: [getLog4jsOptionsToken(name)],
  useFactory: async (): Promise<Log4jsLogger> => {
    const logger = log4js
      .configure(LOG4JS_CONFIG)
      .getLogger(
        process.env.NODE_ENV === 'production' ? 'production' : 'default',
      );
    logger.setParseCallStackFunction(parseNestModuleCallStack);
    logger.addContext('appName', name);
    return new Log4jsLogger(logger);
  },
});
