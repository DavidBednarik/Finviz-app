import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { transformToLinear } from '../utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageNet } from '../entities/imagenet.entity';
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

  private buildTree(flatData: ImageNet[]): any {
    const tree = {};

    flatData.forEach((item) => {
      const parts = item.name.split(' > ');
      let current = tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!current[part]) {
          current[part] = { name: part, children: {} };
        }

        // If it's the last part, it's the leaf node, so we set the size directly
        if (i === parts.length - 1) {
          current[part].size = item.size;
        }

        // Move to the children object for the next iteration
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

  // Method to get all data without pagination
  async getAllData(): Promise<any> {
    const data = await this.imageNetRepository.find();
    return this.buildTree(data);
  }
}
