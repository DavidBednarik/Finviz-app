import { Module } from '@nestjs/common';
import { ImageNetService } from './imagenet.service';
import { ImageNetController } from './imagenet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageNet } from 'src/entities/imagenet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageNet]), // Register repository
  ],
  controllers: [ImageNetController],
  providers: [ImageNetService],
  exports: [ImageNetService],
})
export class ImageNetModule {}
