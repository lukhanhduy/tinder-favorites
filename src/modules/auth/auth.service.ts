import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/shared/schemas';
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto } from './auth.dto';
import { compare } from 'bcrypt'
import { GLOBAL_CONFIG } from 'src/shared/configs';
import { AxiosInstance } from 'axios';
const slugify = require('slugify')

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,

    ) { }

    async create(userDto: AuthRegisterDto) {
        const slug = slugify(userDto.name, {
            lower: true,
        });
        const finduser = await this.userModel.findOne({
            email: userDto.email
        });
        const existSlug = this.userModel.findOne({
            slug: slug,
        })
        userDto.slug = !existSlug ? slug : slug + '-' + new Date().getTime();
        if (finduser) throw new Error('user email exist in system');

        try {

            const user = await this.userModel.create(userDto);

            return await this.userModel.findOne({
                email: userDto.email
            }).populate({
                path: 'image',
                select: ['_id', 'name', 'path']
            }).lean({
                virtuals: true
            })
        } catch (error) {
            throw new Error('Has error when register user, please try again');
        }

    }


    async update(userId: string, userDto: AuthUpdateDto) {
        try {
            const slug = slugify(userDto.name, {
                lower: true,
            });

            await this.userModel.findByIdAndUpdate(userId, userDto as any);
            const existSlug = this.userModel.findOne({
                slug: slug,
                _id: { $ne: userId }
            })
            userDto.slug = !existSlug ? slug : slug + '-' + new Date().getTime();
            return await this.userModel.findOne({
                email: userDto.email
            }).populate({
                path: 'image',
                select: ['_id', 'name', 'path']
            }).lean({
                virtuals: true
            })
        } catch (error) {
            console.log(error)
            throw new Error('Has error when register user, please try again');
        }
    }

    async validate(userId: string) {
        return await this.userModel.findOne({ _id: userId }).populate({
            path: 'image',
            select: ['_id', 'name', 'path']
        }).lean({
            virtuals: true
        })
    }

    async login(authLoginDto: AuthLoginDto) {
        const userDocument = await this.userModel.findOne({ email: authLoginDto.email })

        if (!userDocument) {
            throw new BadRequestException(HttpStatus.UNAUTHORIZED)
        }

        const areEqual = await compare(authLoginDto.password, userDocument.password)

        if (!areEqual) {
            throw new BadRequestException(HttpStatus.UNAUTHORIZED)
        }

        return this.generateToken(userDocument, authLoginDto.remember)
    }

    async generateToken(user: UserDocument, remember: boolean = false) {
        const payload = JSON.parse(JSON.stringify(user));
        const oneDay = parseInt(process.env.JWT_TTL);
        const expiresIn = remember ? 30 * oneDay : oneDay

        const token = this.jwtService.sign(payload, { expiresIn: expiresIn / 1000 })

        return {
            token,
            expiresIn,
        }
    }

    async send(phoneNumber: string) {
      
    }

    async verify(phoneNumber: string, otp: string) {
       
    }

}
