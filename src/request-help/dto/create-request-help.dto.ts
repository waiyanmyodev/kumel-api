import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequestHelpStatus, RequestHelpPriority } from '@prisma/client';

export class CreateRequestHelpDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "1",
    description: "City id.",
  })
  cityId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: "1",
    description: "Township id.",
  })
  townshipId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ enum: RequestHelpStatus, required: false })
  @IsOptional()
  @IsEnum(RequestHelpStatus)
  status?: RequestHelpStatus;

  @ApiProperty({ enum: RequestHelpPriority, required: false })
  @IsOptional()
  @IsEnum(RequestHelpPriority)
  priority?: RequestHelpPriority;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "uploaded.jpg",
    description: "The updated image URL of the request help.",
    required: false,
  })
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  adminReply?: string;
}

export class RequestHelpDto {
  cityId: number;  // Changed from string to number
  townshipId: number;  // Changed from string to number
  location: string;  // Added this required field
  status?: RequestHelpStatus;
  priority?: RequestHelpPriority;
  note?: string;
  image?: string;
  adminReply?: string;
}