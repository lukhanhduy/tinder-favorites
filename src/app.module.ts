import { HttpModule, HttpService, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './modules/app-config/app-config.service';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { CustomConfigService } from './custom-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ContextModule } from './shared/modules/context/context.module';
import { GatewayMiddleware } from './shared/middlewares';
import { UserModule } from './modules/user/user.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    CustomConfigService, ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.URL_MONGO), AuthModule, AppConfigModule, ContextModule, UserModule, FavoritesModule,

  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService,],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GatewayMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

  }
}