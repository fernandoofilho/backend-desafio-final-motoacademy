import { Test, TestingModule } from '@nestjs/testing';
import { FindImgService } from './find-img.service';

describe('FindImgService', () => {
  let service: FindImgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindImgService],
    }).compile();

    service = module.get<FindImgService>(FindImgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
