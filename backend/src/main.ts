import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImageNetService } from './imagenet/imagenet.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const imageNetService = app.get(ImageNetService);
  await imageNetService.parseXml();
  app.enableCors(); // Enable CORS for frontend
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
