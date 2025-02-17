import { Controller, Get, Query } from '@nestjs/common';
import { MobilePhoneService } from './mobile-phone.service';
import { MobilePhone } from './entities/mobile-phone.entity';
import { DeviceTypes } from 'src/shared/enums/deviceTypes';

@Controller('mobile-phone')
export class MobilePhoneController {
  constructor(private readonly mobilePhoneService: MobilePhoneService) {}

  @Get('all')
  async findAll(): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findAll();
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

  @Get('search/model')
  async findByDeviceType(
    @Query('deviceType') model: DeviceTypes,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByModel(model);
  }

  @Get('search/filter')
  async searchFilter(
    @Query('search') search: string,
    @Query('group') group: string,
    @Query('year') year: string,
  ): Promise<MobilePhone[]> {
    return this.mobilePhoneService.findByFilter(search, group, year);
  }
}
