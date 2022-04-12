import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
export type FileDocument = File & Document;

@Schema({
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    }
})
export class File {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true})
    mimetype: string;

    @Prop({ required: true, alias: 'isLocal' })
    is_local: false;

    @Prop({ required: true, alias: 'userId', type: SchemaTypes.ObjectId })
    user_id: Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
