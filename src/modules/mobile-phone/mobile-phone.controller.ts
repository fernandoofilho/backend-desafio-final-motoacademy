/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GeminiService } from 'src/services/gemini/gemini.service';
import { MobilePhone } from './entities/mobile-phone.entity';
import { MobilePhoneService } from './mobile-phone.service';

@Controller('mobile-phone')
export class MobilePhoneController {
  constructor(
    private readonly mobilePhoneService: MobilePhoneService,
    private geminiService: GeminiService,
  ) {}

  @Get('device/:id')
  async find(@Param('id') id: string): Promise<MobilePhone | null> {
    return this.mobilePhoneService.find(id);
  }

  @Get('all')
  async findAll(): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findAll();
  }

  @Get('search/filter')
  async searchFilter(
    @Query('search') search?: string,
    @Query('year') year?: string,
    @Query('group') group?: string,
    @Query('cores') cores?: string,
    @Query('storage') storage?: string,
    @Query('isPhone') isPhone?: string,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.search({ search, year, group, storage, isPhone });
  }
  @Get('search/model')
  async findByModel(@Query('model') model: string): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByModel(model);
  }

  @Get('search/release-year')
  async findByReleaseYear(@Query('year') year: string): Promise<MobilePhone[]> {
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
  async askAI(@Body('question') question: string): Promise<any> {
    const response = await this.geminiService.getResponse(question);
    await Promise.resolve();
    const cleanedJsonString = response.candidates[0].content.parts[0].text
      .replace(/```json|```/g, '')
      .trim()
      .replace(/"([^"]+\\")([^"]+)"/g, '"$1$2"');

    const jsonObject = JSON.parse(cleanedJsonString);
    return this.mobilePhoneService.findByAI(jsonObject);
  }

  @Post('askIntelligence')
  async askIntelligence(
    @Body() body: { question: string; model: string },
  ): Promise<{ response: string }> {
    const { question, model } = body;
    const devices = await this.mobilePhoneService.findByModel(model);
    const response = await this.geminiService.askAboutDevice(
      question,
      devices[0],
    );

    return { response: response.candidates[0].content.parts[0].text };
  }

  @Post('getDeviceDataIntelligence')
  async getDeviceDataIntelligence(
    @Body() body: { model: string },
  ): Promise<{ [x: string]: string }> {
    const { model } = body;
    const device = await this.mobilePhoneService.findByModel(model);
    const response = await this.geminiService.getDeviceData(device[0]);
    const cleanedJsonString = response.candidates[0].content.parts[0].text
      .replace(/```json|```/g, '')
      .trim()
      .replace(/"([^"]+\\")([^"]+)"/g, '"$1$2"');

    const jsonObject: { [x: string]: string } = JSON.parse(cleanedJsonString);
    return jsonObject;
  }
}
