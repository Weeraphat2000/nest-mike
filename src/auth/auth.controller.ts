import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  MiddlewareConsumer,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local/local-auth.guards';
import { Authenticate } from './authenticate.middleware';
import { TestMiddleware } from 'src/test.middleware';
import { Response } from 'express';

@Controller('auth')
// @UseGuards(Authenticate)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(TestMiddleware)
  @Post('register')
  register(@Request() req: any) {
    console.log(req.body, 'a');
    console.log(req.user);
    return req.user;
  }

  @Get()
  getuser(@Request() req: any, @Headers() headers: { authorization: string }) {
    console.log(headers.authorization, 'headers');
    console.log(req.user, 'asdfasdf');
    return 'asdf';
  }

  @Get('/res')
  testRes(@Res() res: Response) {
    // HttpStatus.OK 200
    // HttpStatus.CREATED 201
    // HttpStatus.ACCEPTED 202
    // HttpStatus.BAD_REQUEST 400
    // HttpStatus.UNAUTHORIZED 401
    // HttpStatus.NOT_FOUND 404
    // HttpStatus.INTERNAL_SERVER_ERROR 500
    return res.status(HttpStatus.OK).json({ message: 'OK' });
  }
}
