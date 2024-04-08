import {
  Controller,
  Get,
  MiddlewareConsumer,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local/local-auth.guards';
import { Authenticate } from './authenticate.middleware';
import { TestMiddleware } from 'src/test.middleware';

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
  getuser(@Request() req: any) {
    console.log(req.user, 'asdfasdf');
    return 'asdf';
  }
}
