import { Test, TestingModule } from '@nestjs/testing';
import { MobilePhoneController } from './mobile-phone.controller';
import { MobilePhoneService } from './mobile-phone.service';

describe('MobilePhoneController', () => {
  let controller: MobilePhoneController;
  let service: MobilePhoneService;

  const mockMobilePhoneService = {
    findAll: jest.fn().mockResolvedValue([]),
    findByModel: jest.fn().mockResolvedValue([]),
    findByReleaseYear: jest.fn().mockResolvedValue([]),
    findByInfoField: jest.fn().mockResolvedValue([]),
    findBySpecsField: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobilePhoneController],
      providers: [
        {
          provide: MobilePhoneService,
          useValue: mockMobilePhoneService,
        },
      ],
    }).compile();

    controller = module.get<MobilePhoneController>(MobilePhoneController);
    service = module.get<MobilePhoneService>(MobilePhoneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all mobile phones', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return mobile phones by model', async () => {
    const model = 'Moto G2';
    await expect(controller.findByModel(model)).resolves.toEqual([]);
    expect(service.findByModel).toHaveBeenCalledWith(model);
  });

  it('should return mobile phones by release year', async () => {
    const year = 2020;
    await expect(controller.findByReleaseYear(year)).resolves.toEqual([]);
    expect(service.findByReleaseYear).toHaveBeenCalledWith(year);
  });

  it('should return mobile phones by info field', async () => {
    const field = 'brand';
    const value = 'Motorola';
    await expect(controller.findByInfoField(field, value)).resolves.toEqual([]);
    expect(service.findByInfoField).toHaveBeenCalledWith(field, value);
  });

  it('should return mobile phones by specs field', async () => {
    const field = 'battery';
    const value = '4000mAh';
    await expect(controller.findBySpecsField(field, value)).resolves.toEqual(
      [],
    );
    expect(service.findBySpecsField).toHaveBeenCalledWith(field, value);
  });
});
