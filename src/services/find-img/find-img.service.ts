import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FindImgService {
  private readonly imgDirectory = path.join(__dirname, '../../assets/images');

  findImage(filename: string): string {
    const filePath = path.join(this.imgDirectory, `${filename}`);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'base64');
    }

    throw new NotFoundException(`Imagem ${filename} não encontrada.`);
  }
}
