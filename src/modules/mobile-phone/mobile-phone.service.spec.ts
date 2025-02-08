import { Test, TestingModule } from '@nestjs/testing';
import { MobilePhoneService } from './mobile-phone.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobilePhone } from './entities/mobile-phone.entity';

describe('MobilePhoneService', () => {
  let service: MobilePhoneService;
  let model: Model<MobilePhone>;

  const mockModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MobilePhoneService,
        {
          provide: getModelToken(MobilePhone.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<MobilePhoneService>(MobilePhoneService);
    model = module.get<Model<MobilePhone>>(getModelToken(MobilePhone.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all mobile phones', async () => {
    await expect(service.findAll()).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return mobile phones by model', async () => {
    const modelo = 'RAZR';
    await expect(service.findByModel(modelo)).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({
      Model: { $regex: `\\b${modelo}\\b`, $options: 'i' },
    });
  });

  it('should return mobile phones by release year', async () => {
    const ano = 2020;
    await expect(service.findByReleaseYear(ano)).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({ 'info.Released': ano });
  });

  it('should return mobile phones by added date', async () => {
    const date = '2021-01-01';
    await expect(service.findByAddedDate(date)).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({ Added: date });
  });

  it('should return mobile phones by info field', async () => {
    const field = 'brand';
    const value = 'Motorola';
    await expect(service.findByInfoField(field, value)).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({ [`info.${field}`]: value });
  });

  it('should return mobile phones by specs field', async () => {
    const field = 'battery';
    const value = '4000mAh';
    await expect(service.findBySpecsField(field, value)).resolves.toEqual([]);
    expect(model.find).toHaveBeenCalledWith({ [`specs.${field}`]: value });
  });
});
