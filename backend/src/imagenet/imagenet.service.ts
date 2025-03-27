import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { transformToLinear } from 'src/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageNet } from 'src/entities/imagenet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageNetService {
  constructor(
    @InjectRepository(ImageNet)
    private readonly imageNetRepository: Repository<ImageNet>,
  ) {}

  private xmlFilePath = path.join(
    __dirname,
    '..',
    '..',
    'data',
    'structure_released.xml',
  );

  async parseXml() {
    try {
      const xmlContent = fs.readFileSync(this.xmlFilePath, 'utf8');
      const parser = new xml2js.Parser({
        explicitArray: false,
        mergeAttrs: true,
      });

      const result = await parser.parseStringPromise(xmlContent);

      const flatStructure = transformToLinear(result);

      const formattedData = flatStructure.map((item) => ({
        name: item.name,
        size: item.size,
      }));

      // Save in batches of 1000 records
      const batchSize = 1000;
      for (let i = 0; i < formattedData.length; i += batchSize) {
        const batch = formattedData.slice(i, i + batchSize);
        await this.imageNetRepository.save(batch);
      }

      return { message: 'Data stored successfully!' };
    } catch (error) {
      console.error('Error in parseXML:', error);
      throw new Error('Failed to parse XML');
    }
  }

  async getTree(page: number = 1, limit: number = 100): Promise<any> {
    const offset = (page - 1) * limit;
    const data = await this.imageNetRepository.find({
      skip: offset,
      take: limit,
    });

    return this.buildTree(data);
  }

  private buildTree(flatData: ImageNet[]): any {
    const tree = {};

    flatData.forEach((item) => {
      const parts = item.name.split(' > ');
      let current = tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!current[part]) {
          current[part] = { name: part, children: {}, size: 0 };
        }

        // Accumulate size at each level
        current[part].size += item.size;

        if (i === parts.length - 1) {
          // At the leaf level, store the size from the database
          current[part].size = item.size;
        }

        current = current[part].children;
      }
    });

    return this.formatTree(tree);
  }

  // Recursive function to format the tree
  private formatTree(node: any): any {
    return Object.values(node).map((child: any) => {
      return {
        name: child.name,
        size: child.size,
        children: this.formatTree(child.children),
      };
    });
  }
}
