import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobilePhone } from './entities/mobile-phone.entity';

@Injectable()
export class MobilePhoneService {
  constructor(
    @InjectModel(MobilePhone.name)
    private readonly telefoneModel: Model<MobilePhone>,
  ) {}

  async findAll(): Promise<MobilePhone[]> {
    return this.telefoneModel.find().exec();
  }

  async findByModel(modelo: string): Promise<MobilePhone[]> {
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
}
