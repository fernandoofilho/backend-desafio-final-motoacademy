import { Test, TestingModule } from '@nestjs/testing';
import { MobilePhoneService } from './mobile-phone.service';

describe('MobilePhoneService', () => {
  let service: MobilePhoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobilePhoneService],
    }).compile();

    service = module.get<MobilePhoneService>(MobilePhoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
