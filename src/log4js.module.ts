import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  getLog4jsLoggerToken,
  getLog4jsOptionsToken,
  Log4jsOptions,
} from './log4js.options';
import { createLog4jsLogger } from './log4js.providers';
import { Log4jsLogger } from './log4js.logger';

@Global()
@Module({})
export class Log4jsModule {
  static forRoot(options: Log4jsOptions): DynamicModule {
    return {
      module: Log4jsModule,
      providers: [
        {
          provide: getLog4jsOptionsToken(options.name),
          useValue: options,
        },
        createLog4jsLogger(options.name),
        {
          provide: Log4jsLogger,
          useExisting: getLog4jsLoggerToken(options.name),
        },
      ],
      exports: [
        getLog4jsLoggerToken(options.name),
        {
          provide: Log4jsLogger,
          useExisting: getLog4jsLoggerToken(options.name),
        },
      ],
    };
  }
}
