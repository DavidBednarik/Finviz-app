import { Controller, Get, Query } from '@nestjs/common';
import { ImageNetService } from './imagenet.service';

@Controller('imagenet')
export class ImageNetController {
  constructor(private readonly imageNetService: ImageNetService) {}

  @Get('parse')
  async getXML() {
    return this.imageNetService.parseXml() as any;
  }

  @Get('tree')
  async getTree(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return this.imageNetService.getTree(page, limit);
  }
}
