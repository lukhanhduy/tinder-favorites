
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed, SchemaTypes, Types } from 'mongoose';


export enum FavoriteStatus {
    LIKE = 1,
    PASSED = 2
}

export type FavoriteDocument = Favorite & Document;

@Schema({
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    },
})



export class Favorite {
    @Prop({ alias: 'ownerId', type: SchemaTypes.ObjectId })
    owner_id: Types.ObjectId;

    @Prop({ alias: 'userId', type: SchemaTypes.ObjectId })
    user_id: Types.ObjectId;

    @Prop({  enum: FavoriteStatus})
    status: FavoriteStatus;

}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);