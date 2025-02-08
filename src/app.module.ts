import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobilePhoneModule } from './modules/mobile-phone/mobile-phone.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MobilePhoneModule,
    MongooseModule.forRoot(
      'mongodb+srv://developer:MotoAcademy2025@moto-device.gbmza.mongodb.net/moto-device?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
