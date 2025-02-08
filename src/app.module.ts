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
      process.env.MONGO_HOST || 'mongodb://localhost:27017/moto-academy',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
