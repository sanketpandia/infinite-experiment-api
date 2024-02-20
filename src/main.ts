import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestType } from './enums/request-type.enum';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Infinite Experiment API')
    .setDescription(
      'This API is used by Infinite Flight bot and Infinite Flight UI',
    )
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'token' },
      'bot-token',
    )
    .addGlobalParameters({
      in: 'header',
      name: 'x-request-type',
      required: true,
      schema: {
        type: 'string',
        enum: Object.values(RequestType), // Provide enum values as options
      },
      description: 'Request Origin',
    })
    .addGlobalParameters({
      in: 'header',
      name: 'x-bot-server-id',
      required: false,
      schema: {
        type: 'string',
        example: 'some value',
      },
      description: 'Server id from which the request originated',
    })
    .addGlobalParameters({
      in: 'header',
      name: 'x-bot-token',
      required: false,
      schema: {
        type: 'string',
        example: 'some value',
      },
      description: 'API KEY for the bot',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
