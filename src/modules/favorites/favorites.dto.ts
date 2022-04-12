import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { GetListBaseDto } from "src/shared/commons/base.dto";
import { FavoriteStatus } from "src/shared/schemas/favorite.model";


export class CreateFavoriteDto {

    @IsDefined()
    @IsString()
    @ApiProperty({
        type: String
    })
    owner_id: string;

    @IsDefined()
    @IsString()
    @ApiProperty({
        type: String
    })
    user_id: string;

}

export class FavoriteDto {

    @IsDefined()
    @IsString()
    @ApiProperty({
        type: String
    })
    owner_id: string;

    @IsDefined()
    @IsString()
    @ApiProperty({
        type: String
    })
    user_id: string;

    @IsOptional()
    @IsEnum(FavoriteStatus)
    @ApiProperty()
    status: FavoriteStatus;
}