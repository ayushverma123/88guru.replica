import { NestFactory } from '@nestjs/core';
import { WebsiteModule } from './website.module';

async function bootstrap() {
  const app = await NestFactory.create(WebsiteModule);
  await app.listen(3000);
}
bootstrap();
