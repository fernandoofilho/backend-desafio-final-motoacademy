/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { MobilePhone } from './entities/mobile-phone.entity';
import { MobilePhoneService } from './mobile-phone.service';

@Controller('mobile-phone')
export class MobilePhoneController {
  constructor(
    private readonly mobilePhoneService: MobilePhoneService,
    private geminiService: GeminiService,
  ) {}

  @Get('all')
  async findAll(): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findAll();
  }

  @Get('search/filter')
  async searchFilter(
    @Query('search') search?: string,
    @Query('year') year?: number,
    @Query('group') group?: string,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.search({ search, year, group });
  }
  @Get('search/model')
  async findByModel(@Query('model') model: string): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByModel(model);
  }

  @Get('search/release-year')
  async findByReleaseYear(@Query('year') year: number): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByReleaseYear(year);
  }

  @Get('search/info')
  async findByInfoField(
    @Query('field') field: string,
    @Query('value') value: string,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByInfoField(field, value);
  }

  @Get('search/specs')
  async findBySpecsField(
    @Query('field') field: string,
    @Query('value') value: string,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findBySpecsField(field, value);
  }
  @Get('random')
  async findAny(): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findAny();
  }

  @Post('findByAI')
  async askAI(@Body('query') query: string): Promise<any> {
    const response = await this.geminiService.getResponse(query);
    await Promise.resolve();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cleanedJsonString = response.candidates[0].content.parts[0].text
      .replace(/```json|```/g, '')
      .trim();

    const jsonObject = JSON.parse(cleanedJsonString);
    return this.mobilePhoneService.findByAI(jsonObject);
  }
}
