import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageNet } from './entities/imagenet.entity';
import { ImageNetModule } from './imagenet/imagenet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'imagenet_db',
      entities: [ImageNet],
      synchronize: true, // ⚠️ Set to false in production
    }),
    TypeOrmModule.forFeature([ImageNet]),
    ImageNetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
