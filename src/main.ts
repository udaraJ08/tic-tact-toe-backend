import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
global['fetch'] = require('node-fetch');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //cors configuration
  app.enableCors();
  await app.listen(8080, () => {
    console.log(`Server running at port: 8080`);
  });
}
bootstrap();
