import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserAuthService } from "./auth.service"; 

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserAuthService, 
    PrismaService,
    ConfigService,
    MasterJwtAuthGuard,
    AgentJwtAuthGuard,
    JwtService,
  ],
  exports: [
    UserService,
    UserAuthService, 
    PrismaService,
    JwtModule,
  ],
})
export class UserModule {}
