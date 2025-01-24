import { Injectable } from '@nestjs/common';

@Injectable()
export class MobilePhoneService {
  findAll() {
    return `This action returns all mobilePhone`;
  }

  findOne(name: string) {
    return `This action returns a #${name} mobilePhone`;
  }
}
