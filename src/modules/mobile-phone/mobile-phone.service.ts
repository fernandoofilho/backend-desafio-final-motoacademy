import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeminiResponse } from 'src/shared/interfaces/geminiResponse';
import { MobilePhone } from './entities/mobile-phone.entity';
@Injectable()
export class MobilePhoneService {
  constructor(
    @InjectModel(MobilePhone.name)
    private readonly telefoneModel: Model<MobilePhone>,
  ) {}

  async find(id: string): Promise<MobilePhone | null> {
    const query = await this.telefoneModel.findOne({ _id: id });
    return query;
  }

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

  async findByReleaseYear(ano: string): Promise<MobilePhone[]> {
    return this.telefoneModel
      .find({ 'info.Released': { $regex: `^${ano}`, $options: 'i' } })
      .exec();
  }

  async findByAddedDate(date: string): Promise<MobilePhone[]> {
    return this.telefoneModel
      .find({ Added: { $regex: date, $options: 'i' } })
      .exec();
  }
  async search(filters: {
    search?: string;
    year?: string;
    group?: string;
    isPhone?: string;
    storage?: string; 
    manufacturer?: string; 
  }): Promise<MobilePhone[]> {
    let result: MobilePhone[] = filters.year
      ? await this.findByReleaseYear(filters.year)
      : await this.findAll();
  
    const searchLower = filters.search?.toLowerCase();
    const groupLower = filters.group?.toLowerCase();
    const isPhone = filters.isPhone;
    const storageFilter = filters.storage;
    const manufacturerLower = filters.manufacturer?.toLowerCase();
  
    result = result.filter((phone) => {
      const modelLower = phone.Model.toLowerCase();
  
      if (searchLower && !modelLower.includes(searchLower)) {
        return false;
      }
  
      if (groupLower && !modelLower.includes(groupLower)) {
        return false;
      }
  
      if (isPhone === 'false' && !modelLower.includes('watch')) {
        return false;
      }
      if (isPhone === 'true' && modelLower.includes('watch')) {
        return false;
      }
  
      if (
        storageFilter &&
        !phone.specs?.['Non-volatile Memory Capacity (converted)']
          ?.toString()
          .includes(storageFilter)
      ) {
        return false;
      }
  
      if (
        manufacturerLower &&
        !phone.info?.Manufacturer?.toLowerCase().includes(manufacturerLower)
      ) {
        return false;
      }
  
      return true;
    });
  
    return result;
  }
  

  async findByInfoField(field: string, value: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ [`info.${field}`]: value }).exec();
  }

  async findBySpecsField(field: string, value: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ [`specs.${field}`]: value }).exec();
  }

  async findByAI(filters: GeminiResponse) {
    return this.telefoneModel.find(filters).exec();
  }
}
