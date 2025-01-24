import { Test, TestingModule } from '@nestjs/testing';
import { MobilePhoneController } from './mobile-phone.controller';
import { MobilePhoneService } from './mobile-phone.service';

describe('MobilePhoneController', () => {
  let controller: MobilePhoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobilePhoneController],
      providers: [MobilePhoneService],
    }).compile();

    controller = module.get<MobilePhoneController>(MobilePhoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
