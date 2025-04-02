import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/src/guards/throttler-behind-proxy.guard';
import { AdminModule } from "./admin/admin.module";
import { MasterModule } from './master/master.module';
import { PermissionModule } from "./authorization/permission/permission.module";
import { PermissionGroupModule } from "./authorization/permission-group/permission-group.module";
import { AgentModule } from './agent/agent.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { UserAuthService } from './user/auth.service';
import { PrismaModule } from './prisma/prisma.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    PrismaModule,
    AdminModule,
    MasterModule,
    PermissionModule,
    PermissionGroupModule,
    AgentModule,
    TeamModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    ConfigService,
    UserAuthService
  ],
})
export class AppModule {}
