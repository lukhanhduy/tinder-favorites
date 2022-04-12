import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared';
import { Favorite, FavoriteSchema } from 'src/shared/schemas/favorite.model';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{
      name: Favorite.name,
      schema: FavoriteSchema
    }])
  ],
  providers: [FavoritesService,],
  exports: [FavoritesService]
})
export class FavoritesModule { }
