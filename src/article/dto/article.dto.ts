import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateArticleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: "The ID of the team" })
  teamId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "This is an article content",
    description: "The content of the article",
  })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "image_url.jpg",
    description: "The image URL of the article",
    required: false,
  })
  images?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "news", description: "The type of the article" })
  type: string;
}

export class UpdateArticleDto {
  @IsNumber()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The ID of the team",
    required: false,
  })
  teamId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "Updated article content",
    description: "The updated content of the article",
    required: false,
  })
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "updated_image_url.jpg",
    description: "The updated image URL of the article",
    required: false,
  })
  images?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "announcement",
    description: "The updated type of the article",
    required: false,
  })
  type?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: "Confirmation status of the article",
    required: false,
  })
  is_confirmed?: boolean;
}
