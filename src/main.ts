import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'PUT'],
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ModbusAPI')
    .setDescription('API for controlling Modbus devices')
    .setVersion('1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  await app.listen(3000);
}

bootstrap();
