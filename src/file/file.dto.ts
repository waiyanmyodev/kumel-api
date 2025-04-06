import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FileDto {
  @ApiProperty({ type: "string", format: "binary", required: false })
  @IsOptional()
  file?: Express.Multer.File;
}
