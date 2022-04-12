
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed, SchemaTypes, Types } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Nimble } from 'aws-sdk';
import { File } from './file.model';

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

export enum UserStatus {
    Active = 1,
    Inactive = 2,
    Lock = 3
}

export enum UserVerifyStatus {
    NON = 1,
    VERIFIED = 2
}

export type UserDocument = User & Document;


@Schema({
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    },
})
export class User {
    @Prop({ required: false })
    code: number;

    @Prop({ required: false })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    phone: string


    @Prop({ alias: 'imageId', type: SchemaTypes.ObjectId })
    image_id: Types.ObjectId;

   

    @Prop({ required: false, default: UserVerifyStatus.NON, alias: 'isVerified' })
    is_verified: UserVerifyStatus

    @Prop({ required: false, default: UserStatus.Active })
    status: UserStatus

    @Prop({ required: true })
    password: string;



}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<UserDocument>('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(parseInt(process.env.HASH_SALT), (genSaltError, salt) => {
        if (genSaltError) {
            return next(genSaltError)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            return next()
        })
    })
});

UserSchema.virtual('image', {
    ref: File.name,
    localField: 'image_id',
    foreignField: '_id',
    options: { limit: 1 },
    justOne: true
});

UserSchema.plugin(mongooseLeanVirtuals);


