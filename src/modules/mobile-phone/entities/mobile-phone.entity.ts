import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Entity } from 'src/interfaces/entity';

@Schema({ collection: 'motodevice-data' })
export class MobilePhone implements Entity {
  @Prop()
  Model: string;

  @Prop()
  src: string;

  @Prop()
  Added: string;

  @Prop({ type: Object })
  info: Record<string, string>;

  @Prop({ type: Object })
  specs: Record<string, string>;
}

export const MobilePhoneSchema = SchemaFactory.createForClass(MobilePhone);
MobilePhoneSchema.index({ Model: 1 }, { unique: false });
