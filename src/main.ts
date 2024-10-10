import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger,ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //to avoid CORS errors
  app.enableCors();
  //Pipes configuration 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
    })
  );
  //Basic Swagger configuration.
  const config = new DocumentBuilder()
  .setTitle('HelpHub')
  .setDescription('Endpoints HelpHub')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); // view APIs endpoints.
  await app.listen(3000);
  //Only for develop mode.
  Logger.log(`App running on port 3000`);
}
bootstrap();
