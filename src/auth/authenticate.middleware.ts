import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Authenticate implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  //   import { Request, Response, NextFunction } from 'express';
  //   export function logger(req: Request, res: Response, next: NextFunction) {
  //     console.log(`Request...`);
  //     next();
  //   };

  async use(req: Request, res: Response, next: (error?: any) => void) {
    console.log(req.headers.authorization, 'aaaa');
    const user = await this.userService.finduser(req.body.name);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      delete user.password;
      req.user = user;
      console.log(user, 'asdfasdfadsfadsfasdfadsf');
      next();
      return;
      //   const { password, ...result } = user;
      //   return result;
    }
    throw new NotFoundException('user error jk');
  }
}
