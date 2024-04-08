import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { Authenticate } from './authenticate.middleware';
import { TestMiddleware } from 'src/test.middleware';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authenticate, TestMiddleware).forRoutes(
      { path: 'auth/register', method: RequestMethod.POST },
      // { path: 'auth', method: RequestMethod.GET },
    );

    // consumer
    //   .apply(TestMiddleware)
    //   .forRoutes({ path: 'auth/register', method: RequestMethod.POST }); // ใส่ middleware ได้เรื่อยๆ
  }
}
