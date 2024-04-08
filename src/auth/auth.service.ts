import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validatedUser(name: string, password: string) {
    console.log(name, 'auth serivce');
    const user = await this.userService.finduser(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
    // throw new NotFoundException('name invalide');
  }
}
