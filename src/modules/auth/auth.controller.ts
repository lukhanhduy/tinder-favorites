import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BaseController } from 'src/shared/commons/base.controller';
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestContext } from 'src/shared/modules/context';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';

@Controller('api/v1/auth')
@UsePipes(new ValidationPipe())
@ApiTags('user authentication')

export class AuthController extends BaseController {
    constructor(
        private authService: AuthService,
        private readonly requestContext: RequestContext,

    ) {
        super();
    }

    @Post('')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard('jwt'))

    async create(@Body() authRegisterDto: AuthRegisterDto, @Res() response: Response) {
        try {
            const user = await this.authService.create(authRegisterDto);
            return this.responseSuccess(response, user, {
                statusCode: HttpStatus.CREATED,
            });
        } catch (error) {
            return this.responseFailed(response, {
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error_code: 'UNPROCESSABLE_ENTITY',
                message: error?.message?.toString()
            });
        }
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    async register(@Body() authRegisterDto: AuthRegisterDto, @Res() response: Response) {
        try {
            const user = await this.authService.create(authRegisterDto);
            return this.responseSuccess(response, user, {
                statusCode: HttpStatus.CREATED,
            });
        } catch (error) {
            console.log(error)
            return this.responseFailed(response, {
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error_code: 'UNPROCESSABLE_ENTITY',
                message: error?.message?.toString()
            });
        }
    }

    @Post('login')
    // @UseGuards(AuthGuard('local'))
    async login(@Req() req: Request, @Body() authLoginDto: AuthLoginDto, @Res() response: Response) {
        try {
            const user = await this.authService.login(authLoginDto);
            return this.responseSuccess(response, user, {
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            return this.responseFailed(response, {
                statusCode: HttpStatus.UNAUTHORIZED,
                error_code: 'UNAUTHORIZED',
                message: error?.message?.toString()
            });
        }
    }


    @Post('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard('jwt'))

    async updateProfile(@Body() authRegisterDto: AuthUpdateDto, @Res() response: Response) {
        try {
            const user = await this.authService.update(this.requestContext.user.id, authRegisterDto);
            return this.responseSuccess(response, user, {
                statusCode: HttpStatus.CREATED,
            });
        } catch (error) {
            return this.responseFailed(response, {
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error_code: 'UNPROCESSABLE_ENTITY',
                message: error?.message?.toString()
            });
        }
    }


    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    me(@Req() req: Request, @Res() response: Response) {
        return this.responseSuccess(response, req.user, {
            statusCode: HttpStatus.OK,
        });
    }

    @Post('send')
    async send(@Body('phone_number') phoneNumber: string) {
        const data = await this.authService.send(phoneNumber);
        return {
            status_code: 200,
            data
        }
    }

    @Post('verify')
    async verify(@Body('phone_number') phoneNumber: string, @Body('otp') otp: string) {
        const data = await this.authService.verify(phoneNumber, otp);
        return {
            status_code: 200,
            data
        }
    }

}
