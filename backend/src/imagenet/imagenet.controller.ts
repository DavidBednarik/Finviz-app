import { Controller, Get, Query } from '@nestjs/common';
import { ImageNetService } from './imagenet.service';

@Controller('imagenet')
export class ImageNetController {
  constructor(private readonly imageNetService: ImageNetService) {}

  @Get('parse')
  async getXML() {
    return this.imageNetService.parseXml() as any;
  }

  @Get('tree2')
  async getAllData() {
    return this.imageNetService.getAllData(); // Call a method to fetch all data
  }
}
