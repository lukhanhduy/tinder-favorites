import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsOptional, IsString, ValidateNested } from "class-validator";
import { GetListBaseDto } from "src/shared/commons/base.dto";


export class UserListDto extends GetListBaseDto {

    @IsOptional()
    @ValidateNested({ each: true })
    @IsString()
    @ApiProperty({
        type: String
    })
    phone_number: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @IsString()
    @ApiProperty({
        type: String
    })
    email: string;
}