import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('STONE-CUSTOMER-API')
  .setDescription('Stone Customer-API v1')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
export const swaggerGenerator = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('documents', app, document);
};
