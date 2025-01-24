import { Module } from '@nestjs/common';
import { MobilePhoneService } from './mobile-phone.service';
import { MobilePhoneController } from './mobile-phone.controller';

@Module({
  controllers: [MobilePhoneController],
  providers: [MobilePhoneService],
})
export class MobilePhoneModule {}
