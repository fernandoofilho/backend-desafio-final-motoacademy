import { Module } from '@nestjs/common';
import { FindImgService } from './find-img/find-img.service';

@Module({
  providers: [FindImgService],
  exports: [FindImgService],
})
export class UtilsModule {}
