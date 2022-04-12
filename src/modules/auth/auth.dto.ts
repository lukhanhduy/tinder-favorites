import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, isEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min, min, ValidateNested } from "class-validator";
import { Address, File, UserStatus, UserVerifyStatus, } from "src/shared/schemas";
export class FileDto {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    id: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    name: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    path: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    mimetype: string;
}




export class AuthRegisterDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @IsEmail()
    @Length(3, 50)
    email: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @Length(3, 40)
    password: string;

    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    phone: string;

    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    @Length(3, 40)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image_id: string

    @IsOptional()
    @IsEnum(UserVerifyStatus)
    @ApiProperty()
    isVerified: UserVerifyStatus

    @IsOptional()
    @IsEnum(UserStatus)
    @ApiProperty()
    status: UserStatus

    slug: string

}

export class AuthUpdateDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @IsEmail()
    @Length(3, 50)
    email: string;



    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @Length(3, 40)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image_id: string

    @IsOptional()
    @IsEnum(UserVerifyStatus)
    @ApiProperty()
    isVerified: UserVerifyStatus

    @IsOptional()
    @IsEnum(UserStatus)
    @ApiProperty()
    status: UserStatus

    slug: string

}

export class AuthLoginDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @IsEmail()
    @Length(3, 50)
    email: string;


    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    @Length(3, 40)
    password: string;

    @IsBoolean()
    @IsOptional()
    remember: boolean;

}