import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './common/app.module';
import { swaggerGenerator } from './common/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  swaggerGenerator(app);

  const port = 3000;
  await app.listen(port);
  Logger.log(`Customer-api listen on: ${port}`);
}
bootstrap();
