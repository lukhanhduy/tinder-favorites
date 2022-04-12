import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shared/schemas';
import { FavoritesModule } from '../favorites/favorites.module';
@Module({
  imports: [
    SharedModule,
    FavoritesModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
