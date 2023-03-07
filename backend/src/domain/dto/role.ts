import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { APP_PERMISSION } from 'src/common/interface';

export class CreateRoleDTO {
  @IsString()
  name: string;
}

export class Permission {
  @IsEnum(APP_PERMISSION)
  name: string;

  @IsBoolean()
  create: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  delete: boolean;
}

export class UpdateRoleDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(APP_PERMISSION.length - 1)
  @ArrayMaxSize(APP_PERMISSION.length - 1)
  @Type(() => Permission)
  permissions: Permission[];
}
