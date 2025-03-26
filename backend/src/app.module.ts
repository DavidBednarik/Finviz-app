import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageNetModule } from './imagenet/imagenet.module';

@Module({
  imports: [ImageNetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
