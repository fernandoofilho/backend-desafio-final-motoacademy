import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobilePhone } from './entities/mobile-phone.entity';
import { DeviceTypes } from 'src/shared/enums/deviceTypes';

@Injectable()
export class MobilePhoneService {
  constructor(
    @InjectModel(MobilePhone.name)
    private readonly telefoneModel: Model<MobilePhone>,
  ) {}

  async findAll(): Promise<MobilePhone[]> {
    return this.telefoneModel.find().exec();
  }
  async findAny(): Promise<MobilePhone[]> {
    return this.telefoneModel.aggregate([{ $sample: { size: 5 } }]);
  }

  async findByModel(modelo: string): Promise<MobilePhone[]> {
    const regex = new RegExp(modelo, 'i');
    return this.telefoneModel
      .find({ Model: { $regex: `\\b${regex.source}\\b`, $options: 'i' } })
      .exec();
  }

  async findByDeviceType(modelo: DeviceTypes): Promise<MobilePhone[]> {
    const regex = new RegExp(modelo, 'i');
    return this.telefoneModel
      .find({ Model: { $regex: `\\b${regex.source}\\b`, $options: 'i' } })
      .exec();
  }
  async findByReleaseYear(ano: number): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ 'info.Released': ano }).exec();
  }

  async findByAddedDate(date: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ Added: date }).exec();
  }

  async findByInfoField(field: string, value: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ [`info.${field}`]: value }).exec();
  }

  async findBySpecsField(field: string, value: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ [`specs.${field}`]: value }).exec();
  }
  async findByFilter(
    search: string,
    group: string,
    year: string,
  ): Promise<MobilePhone[]> {
    const query: any = {};

    if (search?.length > 0) {
      query.$or = [
        { Model: { $regex: search, $options: 'i' } },
        { 'specs.Brand': { $regex: search, $options: 'i' } },
        { 'specs.Codename': { $regex: search, $options: 'i' } },
      ];
    }

    if (group?.length > 0) {
      query['Model'] = { $regex: group, $options: 'i' };
    }

    if (year?.length > 0) {
      query['info.Released'] = { $regex: year, $options: 'i' };
    }

    return this.telefoneModel.find(query).exec();
  }
}
