import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobilePhoneModule } from './modules/mobile-phone/mobile-phone.module';

@Module({
  imports: [MobilePhoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
