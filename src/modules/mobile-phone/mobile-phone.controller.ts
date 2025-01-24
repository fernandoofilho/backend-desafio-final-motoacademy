import { Controller, Get, Param } from '@nestjs/common';
import { MobilePhoneService } from './mobile-phone.service';

@Controller('mobile-phone')
export class MobilePhoneController {
  constructor(private readonly mobilePhoneService: MobilePhoneService) {}

  @Get()
  findAll() {
    return this.mobilePhoneService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.mobilePhoneService.findOne(name);
  }
}
