import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

<<<<<<< HEAD
@Schema({ collection: 'motodevice-data' })
=======
@Schema({ collection: 'device-data' })
>>>>>>> main
export class MobilePhone {
  @Prop()
  Model: string;

  @Prop()
<<<<<<< HEAD
  src: string;

  @Prop()
=======
>>>>>>> main
  Added: string;

  @Prop({ type: Object })
  info: Record<string, string>;

  @Prop({ type: Object })
  specs: Record<string, string>;
}

export const MobilePhoneSchema = SchemaFactory.createForClass(MobilePhone);
MobilePhoneSchema.index({ Model: 1 }, { unique: false });
