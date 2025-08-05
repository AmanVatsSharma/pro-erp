import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { schema } from './schema';
import { EnterpriseServer } from './enterprise-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express();

  // Create enterprise server with auto-generated schema
  const server = new EnterpriseServer(expressApp, schema);

  // Example: register plugins here
  // server.registerPlugin({ name: 'Example', schema: exampleSchema });

  app.use(expressApp);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
