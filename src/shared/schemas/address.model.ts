import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed, SchemaType, SchemaTypes } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    }
})
export class Address {
    @Prop({ _id: false })
    _id: false
    @Prop({ required: false, name: 'provinceId' })
    province_id: number;

    @Prop({ required: false, name: 'districtId' })
    district_id: number;

    @Prop({ required: false, name: 'wardId' })
    ward_id: number;

    @Prop({ required: false, name: 'wardName' })
    ward_name: string;

    @Prop({ required: false, name: 'districtName' })
    district_name: string;

    @Prop({ required: false, name: 'provinceName' })
    province_name: string;

    @Prop({  })
    lat: number;

    @Prop({  })
    long: number;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, type: SchemaTypes.Mixed })
    position: Mixed
}

export const AddressSchema = SchemaFactory.createForClass(Address);
