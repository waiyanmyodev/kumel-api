import { Module } from '@nestjs/common';
import { RequestHelpService } from './request-help.service';
import { RequestHelpController } from './request-help.controller';

@Module({
  controllers: [RequestHelpController],
  providers: [RequestHelpService],
})
export class RequestHelpModule {}
