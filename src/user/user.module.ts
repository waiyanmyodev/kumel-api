import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserAuthService } from "./auth.service";
import { UserJwtStrategy } from "src/common/src/strategies/user-jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserAuthService,
    PrismaService,
    ConfigService,
    JwtService,
    UserJwtStrategy,
  ],
  exports: [
    UserService,
    UserAuthService,
    UserJwtStrategy,
    PrismaService,
    JwtModule,
  ],
})
export class UserModule {}
