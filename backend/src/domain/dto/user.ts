import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  roleId: string;

  @IsString()
  username: string;
}

export class UpdateUserDTO {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  roleId: string;
}

export class ChangePasswordDTO {
  @IsString()
  id: string;

  @IsString()
  password: string;
}

export class ChangeUsernameDTO {
  @IsString()
  id: string;

  @IsString()
  username: string;
}
