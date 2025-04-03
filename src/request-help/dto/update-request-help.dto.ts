import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRequestHelpDto } from './create-request-help.dto';
import { RequestHelpPriority, RequestHelpStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateRequestHelpDto extends PartialType(CreateRequestHelpDto) {
      @IsString()
      @ApiProperty({
        example: "1",
        description: "City id.",
      })
      cityId: number;
    
      @IsString()
      @ApiProperty({
        example: "1",
        description: "Township id.",
      })
      townshipId: number;
    
      @ApiProperty()
      @IsString()
      location: string;
    
      @ApiProperty({ enum: RequestHelpStatus, required: false })
      @IsEnum(RequestHelpStatus)
      status: RequestHelpStatus;
    
      @ApiProperty({ enum: RequestHelpPriority, required: false })
      @IsEnum(RequestHelpPriority)
      priority: RequestHelpPriority;
    
      @ApiProperty({ required: false })
      @IsString()
      note: string;
    
      @ApiProperty({ type: 'string', format: 'binary', required: false })
      file: Express.Multer.File;
    
      @ApiProperty({ required: false })
      @IsString()
      adminReply: string;
}

export class UpdateRequestHelp {
  cityId: number;
  townshipId: number;
  status: RequestHelpStatus;
  priority: RequestHelpPriority;
  note: string;
  image: string;
  adminReply: string;
}