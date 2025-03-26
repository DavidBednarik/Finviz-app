import { Controller, Get, Query } from '@nestjs/common';
import { ImageNetService } from './imagenet.service';

@Controller('imagenet')
export class ImageNetController {
  constructor(private readonly imageNetService: ImageNetService) {}

  @Get('parse')
  async getXML() {
    return this.imageNetService.parseXml() as any;
  }
}
