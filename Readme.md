# @alkinum/log4js-module

This is a log4js-node module for Nest.js.

Baiscally this is a simplified reworked fork of [nestx-log4js](https://github.com/nest-x/nestx-log4js), thanks for their work.

## Usage

Step 1: Install this package.

```bash
npm i @alkinum/log4js-module
```

Step 2: Import it to your Nest.js project.

For `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { Log4jsModule } from '@alkinum/log4js-module';

@Module({
  imports: [
    Log4jsModule.forRoot({ name: 'YOUR_PROJECT_NAME' }),
  ],
})
export class AppModule {}
```

For `main.ts`:

```ts
import { Log4jsLogger } from '@alkinum/log4js-module';

app.useLogger(app.get(Log4jsLogger));
```

Tip: **We only provide a package with typescript files, if you're using vanilla JS, this package is not the proper choice.**

## License

MIT
