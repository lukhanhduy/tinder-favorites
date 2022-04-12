import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument, FavoriteStatus } from 'src/shared/schemas/favorite.model';
import { CreateFavoriteDto, FavoriteDto } from './favorites.dto';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    ) { }

    create(favoriteDto: CreateFavoriteDto) {
        return this.favoriteModel.create({
            ...favoriteDto,
            status: FavoriteStatus.LIKE
        })
    }

    find(favoriteDto: CreateFavoriteDto) {
        return this.favoriteModel.findOne(favoriteDto);
    }

    update(favoriteDto: FavoriteDto) {
        return this.favoriteModel.findOneAndUpdate({
            user_id: favoriteDto.user_id,
            owner_id: favoriteDto.owner_id,
        }, favoriteDto, { new: true, upsert: true });
    }
}
