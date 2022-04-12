import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetListBaseDto {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ default: 0 })
    skip: number = 0;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ default: 10 })
    limit: number = 10;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Expose({ name: "sort_by", toPlainOnly: true })
    sortBy: string;

    @Expose({ name: "sort_type", toPlainOnly: true })

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsEnum([1, -1])
    sortType: number;
}