import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(name: string, password: string) {
    console.log(name, 'asdf');
    const user = await this.authService.validatedUser(name, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException({ message: 'not found user' });
    }
    return user;
  }
}
