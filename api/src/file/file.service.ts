import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ensureDir, writeFile } from 'fs-extra';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { FileResponse } from './file-response';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async saveFile(file: MemoryStoredFile): Promise<FileResponse> | undefined {
    if (file) {
      const dateFolder = format(new Date(), 'yyyy-mm-dd');
      const uploadFolder = `${path}/uploads/${dateFolder}`;
      await ensureDir(uploadFolder);
      const webpFile = await this.convertToWebP(file.buffer);

      await writeFile(
        `${uploadFolder}/${file.originalName.split('.')[0]}.webp`,
        webpFile,
      );

      const res: FileResponse = {
        name: `${file.originalName.split('.')[0]}.webp`,
        url: `/uploads/${dateFolder}/${file.originalName.split('.')[0]}.webp`,
      };

      return res;
    } else {
      return undefined;
    }
  }

  private async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
