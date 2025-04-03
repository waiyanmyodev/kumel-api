import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: "The ID of the user" })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "This is a post content",
    description: "The content of the post",
  })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "item1,item2",
    description: "Comma-separated list of items",
    required: false,
  })
  items?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "image_url.jpg",
    description: "The image URL of the post",
    required: false,
  })
  images?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "New York, USA",
    description: "The location of the post",
    required: false,
  })
  location?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "active", description: "The status of the post" })
  status: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "high",
    description: "The priority of the post",
    required: false,
  })
  priority?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "blog", description: "The type of the post" })
  type: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: "Indicates if the post is deleted",
    required: false,
  })
  is_deleted?: boolean;
}
