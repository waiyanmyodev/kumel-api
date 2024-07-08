import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/src/guards/throttler-behind-proxy.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{ 
      ttl: 60000,
      limit: 2,
    }])
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard
    },
  ],
})
export class AppModule {}
