import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { RequestContext } from 'src/shared/modules/context';
import { User, UserDocument } from 'src/shared/schemas';
import { FavoriteStatus } from 'src/shared/schemas/favorite.model';
import { FavoritesService } from '../favorites/favorites.service';
import { UserListDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly requestContext: RequestContext,
        private readonly favoriteService: FavoritesService

    ) { }

    async getList(userDto: UserListDto) {
        const filter = pick(userDto, ['email', 'phone_number']);
        return this.userModel.find({
            $or: [
                filter
            ]
        }).skip(userDto.skip).limit(userDto.limit)
    }

    async like(userId: string) {
        if( userId ==  this.requestContext.user.id ) throw new Error('Request failed')
        const [user, findFavorite] = await Promise.all([
            this.userModel.findById(userId),
            this.favoriteService.find({
                owner_id: this.requestContext.user.id,
                user_id: userId
            })
        ]);
        if (!user) throw new Error('User dont exist in system');
        if ((findFavorite && findFavorite.status) == FavoriteStatus.LIKE) throw new Error('Favorite exist in system');
        return this.favoriteService.create({
            owner_id: this.requestContext.user.id,
            user_id: userId,
        })
    }

    async passed(userId: string) {
        if( userId ==  this.requestContext.user.id ) throw new Error('Request failed')

        const [user] = await Promise.all([
            this.userModel.findById(userId)
        ]);
        if (!user) throw new Error('User dont exist in system');
        return this.favoriteService.update({
            owner_id: this.requestContext.user.id,
            user_id: userId,
            status: FavoriteStatus.PASSED
        })
    }

}
