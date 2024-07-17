import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/src/guards/throttler-behind-proxy.guard';
import { AdminModule } from "./admin/admin.module";
import { MasterModule } from './master/master.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    AdminModule,
    MasterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
