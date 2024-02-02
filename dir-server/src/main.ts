import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
const killPort = require('kill-port')
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ZodValidationPipe())
  await killPort(4000)
  await app.listen(4000); 
}
bootstrap();
