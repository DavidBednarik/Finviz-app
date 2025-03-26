import { Module } from '@nestjs/common';
import { ImageNetService } from './imagenet.service';
import { ImageNetController } from './imagenet.controller';

@Module({
  controllers: [ImageNetController],
  providers: [ImageNetService],
  exports: [ImageNetService],
})
export class ImageNetModule {}
