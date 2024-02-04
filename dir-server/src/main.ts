import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import * as os from 'node:os'
const cluster = require('cluster')
const killPort = require('kill-port')

// async function bootstrap() {
//   if(cluster.isPrimary){
//     const numCPUs = os.cpus().length-1;
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }
//     cluster.on('exit', (worker) => {
//       console.log(`Worker ${worker.process.pid} died`);
//       cluster.fork();
//     });
//   }else {
//     const app = await NestFactory.create(AppModule,{cors:true});
//     app.setGlobalPrefix('/api')
//     app.useGlobalPipes(new ZodValidationPipe())
//     await killPort(4000)
//     await app.listen(4000); 
//   }
// }
// bootstrap();

async function bootstrap() {
    const app = await NestFactory.create(AppModule,{cors:true});
    app.setGlobalPrefix('/api')
    app.useGlobalPipes(new ZodValidationPipe())
    await killPort(4000)
    await app.listen(4000); 
}
bootstrap();
