import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { model, Schema, connect, connection } from 'mongoose';
import { Transport } from "@nestjs/microservices";
async function bootstrap() {
  try {
    Logger.log('Connection succecced, get configs for application...')
    const db = await connect(process.env.URL_MONGO);
    
    console.log(process.env.GOONG_API)

    db.connection.close();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector))
    );
    const config = new DocumentBuilder()
      .setTitle('Story Document')
      .setDescription('The story API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.connectMicroservice({

      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_HOST],
        queue: 'elastic',
        queueOptions: {
          durable: false
        },
      }
    });
    await app.listen(process.env.PORT);
    Logger.log('Config has been import to application, close temp connection.')
  } catch (error) {
    console.log(error)
    Logger.log('Error connect database')
  }
}
bootstrap();
