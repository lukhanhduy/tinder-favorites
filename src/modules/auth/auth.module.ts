import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shared/schemas/user.model';
import { JwtModule } from '@nestjs/jwt'
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { SharedModule } from 'src/shared';
import { GLOBAL_CONFIG } from 'src/shared/configs';
import Axios from 'axios'

@Module({
  imports: [
    AppConfigModule,
    SharedModule,
    PassportModule,

    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return { secret: configService.jwtConfig.secret }
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    JwtAuthGuard,
  ]
})
export class AuthModule { }
