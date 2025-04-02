import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerBehindProxyGuard } from "./common/src/guards/throttler-behind-proxy.guard";
import { AdminModule } from "./admin/admin.module";
import { PermissionModule } from "./authorization/permission/permission.module";
import { PermissionGroupModule } from "./authorization/permission-group/permission-group.module";
import { TeamModule } from "./team/team.module";
import { UserModule } from "./user/user.module";
import { CityModule } from "./city/city.module";
import { TownshipModule } from "./township/township.module";
import { EventsGateway } from "./events/events.gateway";
import { UserAuthService } from "./user/auth.service";
import { PrismaModule } from "./prisma/prisma.module";
import { RequestHelpModule } from './request-help/request-help.module';

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
    PermissionModule,
    PermissionGroupModule,
    TeamModule,
    UserModule,
    CityModule,
    TownshipModule,
    RequestHelpModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    ConfigService,
    EventsGateway,
    UserAuthService,
  ],
})
export class AppModule {}
