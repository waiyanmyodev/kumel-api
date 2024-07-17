import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateMasterDto {
  @IsInt()
  @IsNotEmpty()
  adminId: number;

  @IsString()
  @Length(1, 5)
  @IsNotEmpty()
  masterCode: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  remark?: string;
}
