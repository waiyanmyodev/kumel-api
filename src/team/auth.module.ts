import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserJwtStrategy } from '../common/src/strategies/user-jwt.strategy';
import { UserAuthService } from '../user/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'user-jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [UserAuthService, UserJwtStrategy],  
  exports: [UserAuthService],
})
export class AuthModule {}
