import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobilePhone } from './entities/mobile-phone.entity';
import { GeminiResponse } from 'src/interfaces/geminiResponse';

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

  async findByReleaseYear(ano: number): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ 'info.Released': ano }).exec();
  }

  async findByAddedDate(date: string): Promise<MobilePhone[]> {
    return this.telefoneModel.find({ Added: date }).exec();
  }

  async search(filters: {
    search?: string;
    year?: number;
    addedDate?: string;
    group?: string;
  }): Promise<MobilePhone[]> {
    let result: MobilePhone[] = [];

    if (filters.year) {
      result = await this.findByReleaseYear(filters.year);
    } else if (filters.addedDate) {
      result = await this.findByAddedDate(filters.addedDate);
    } else {
      result = await this.telefoneModel.find().exec();
    }

    if (filters.search) {
      result = result.filter((phone) =>
        phone.Model.toLowerCase().includes(filters.search!.toLowerCase()),
      );
    }

    if (filters.group) {
      result = result.filter((phone) =>
        phone.Model.toLowerCase().includes(filters.group!.toLowerCase()),
      );
    }

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
