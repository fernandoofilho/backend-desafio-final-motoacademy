import { Injectable } from '@nestjs/common';
import { CreateMobilePhoneDto } from './dto/create-mobile-phone.dto';
import { UpdateMobilePhoneDto } from './dto/update-mobile-phone.dto';

@Injectable()
export class MobilePhoneService {
  create(createMobilePhoneDto: CreateMobilePhoneDto) {
    return 'This action adds a new mobilePhone';
  }

  findAll() {
    return `This action returns all mobilePhone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobilePhone`;
  }

  update(id: number, updateMobilePhoneDto: UpdateMobilePhoneDto) {
    return `This action updates a #${id} mobilePhone`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobilePhone`;
  }
}
