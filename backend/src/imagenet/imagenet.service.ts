import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';

@Injectable()
export class ImageNetService {
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

      const flatStructure = this.transformToLinear(result);
      return flatStructure;
    } catch (error) {
      console.error('Error in parseXML:', error);
      throw new Error('Failed to parse XML');
    }
  }

  transformToLinear(json: any): any[] {
    const results: any[] = [];

    function traverse(node: any, path: string): number {
      if (!node.words) return 0; // Ignore nodes without words

      let size = 0;
      let childrenCount = 0;

      if (node.synset) {
        const children = Array.isArray(node.synset)
          ? node.synset
          : [node.synset];
        for (const child of children) {
          childrenCount += traverse(child, `${path} > ${child.words}`);
        }
      }

      size = childrenCount; // Store the accumulated size of all children
      results.push({ name: path, size });

      return size + 1; // Include the current node itself
    }

    const root = json.ImageNetStructure;
    if (root && root.synset) {
      const totalSize = traverse(root.synset, root.words || 'ImageNet');
      results[0].size = totalSize; // Ensure the root size is correct
    }

    return results;
  }
}
