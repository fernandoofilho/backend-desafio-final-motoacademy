import { PartialType } from '@nestjs/mapped-types';
import { CreateMobilePhoneDto } from './create-mobile-phone.dto';

export class UpdateMobilePhoneDto extends PartialType(CreateMobilePhoneDto) {}
