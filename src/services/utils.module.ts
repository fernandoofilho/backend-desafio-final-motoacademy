import { Module } from '@nestjs/common';
import { FindImgService } from './find-img/find-img.service';
import { GeminiService } from './gemini/gemini.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FindImgService, GeminiService],
  exports: [FindImgService, GeminiService],
})
export class UtilsModule {}
