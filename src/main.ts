import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //para evitar errores de CORS
  app.enableCors();
  //Para la configuración global de pipes 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
    })
  );
  //configuración básica de Swagger
  const config = new DocumentBuilder()
  .setTitle('HelpHub')
  .setDescription('Endpoints HelpHub')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); // visualizar en la api los endpoints con Swagger
  await app.listen(3000);
  //Se quitara para deploy.
  Logger.log(`App running on port 3000`);
}
bootstrap();
