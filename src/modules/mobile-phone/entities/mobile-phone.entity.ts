import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'device-data' })
export class MobilePhone {
  @Prop()
  Model: string;

  @Prop()
  Added: string;

  @Prop({ type: Object })
  info: Record<string, string>;

  @Prop({ type: Object })
  specs: Record<string, string>;
}

export const MobilePhoneSchema = SchemaFactory.createForClass(MobilePhone);
MobilePhoneSchema.index({ Model: 1 }, { unique: false });
