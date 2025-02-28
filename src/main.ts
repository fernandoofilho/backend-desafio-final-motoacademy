import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/assets', express.static(join(__dirname, 'assets')));
  const config = new DocumentBuilder()
    .setTitle('API - Phone Specs')
    .setDescription(
      'API - Phone Specs para consulta e armazenamento de dados provenientes de uma api externas',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.use((req, res, next) => {
    console.info(`Request Method: ${req.method}`);
    console.info(`Request URL: ${req.originalUrl}`);
    console.info(`Request Headers: ${JSON.stringify(req.headers)}`);

    req.on('data', (chunk) => {
      console.info(`Request Body: ${chunk}`);
    });

    next();
  });
  const allowedOrigin = process.env.APP_CLIENT || '*';
  app.enableCors({
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });
  console.log(allowedOrigin);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
