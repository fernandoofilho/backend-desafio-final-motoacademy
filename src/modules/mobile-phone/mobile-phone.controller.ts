import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobilePhoneService } from './mobile-phone.service';
import { CreateMobilePhoneDto } from './dto/create-mobile-phone.dto';
import { UpdateMobilePhoneDto } from './dto/update-mobile-phone.dto';

@Controller('mobile-phone')
export class MobilePhoneController {
  constructor(private readonly mobilePhoneService: MobilePhoneService) {}

  @Post()
  create(@Body() createMobilePhoneDto: CreateMobilePhoneDto) {
    return this.mobilePhoneService.create(createMobilePhoneDto);
  }

  @Get()
  findAll() {
    return this.mobilePhoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobilePhoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobilePhoneDto: UpdateMobilePhoneDto) {
    return this.mobilePhoneService.update(+id, updateMobilePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobilePhoneService.remove(+id);
  }
}
