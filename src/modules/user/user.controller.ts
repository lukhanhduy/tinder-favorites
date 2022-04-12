import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { BaseController } from 'src/shared/commons/base.controller';
import { UserListDto } from './user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController extends BaseController {
    constructor(
        private userService: UserService
    ) {
        super()
    }
    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getList(@Req() req: Request, @Res() response: Response, @Body() userListDto: UserListDto) {
        try {
            const conversations = await this.userService.getList(userListDto);
            return this.responseSuccess(response, conversations, {
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

    @Post('like')
    @UseGuards(AuthGuard('jwt'))
    async like(@Req() req: Request, @Res() response: Response, @Body('user_id') userId: string) {
        try {
            const conversations = await this.userService.like(userId);
            return this.responseSuccess(response, conversations, {
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

    @Post('passed')
    @UseGuards(AuthGuard('jwt'))
    async passed(@Req() req: Request, @Res() response: Response, @Body('user_id') userId: string) {
        try {
            const conversations = await this.userService.passed(userId);
            return this.responseSuccess(response, conversations, {
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

}
