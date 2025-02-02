import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobilePhoneService } from './mobile-phone.service';
import { MobilePhoneController } from './mobile-phone.controller';
import { MobilePhone, MobilePhoneSchema } from './entities/mobile-phone.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MobilePhone.name, schema: MobilePhoneSchema },
    ]),
  ],
  controllers: [MobilePhoneController],
  providers: [MobilePhoneService],
})
export class MobilePhoneModule {}
