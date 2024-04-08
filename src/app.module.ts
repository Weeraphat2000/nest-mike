import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { Authenticate } from './auth/authenticate.middleware';
import { AuthController } from './auth/auth.controller';
import { TestMiddleware } from './test.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ProductsModule,
    UserModule,
    OrdersModule,
    AuthModule,
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 600, // ระยะเวลาในหน่วยวินาที ในกรณีนี้คือ 1 นาที
        limit: 3, // จำนวนครั้งที่อนุญาตในระยะเวลา ในกรณีนี้คือ 10 ครั้ง
      },
      {
        name: 'long',
        ttl: 600, // ระยะเวลาในหน่วยวินาที ในกรณีนี้คือ 1 นาที
        limit: 10, // จำนวนครั้งที่อนุญาตในระยะเวลา ในกรณีนี้คือ 10 ครั้ง
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  // provider นี้กำลังกำหนดว่า ThrottlerGuard จะถูกใช้เป็น guard สำหรับแอปพลิเคชัน NestJS ของคุณเพื่อป้องกันการเข้าถึงโดยไม่ได้รับอนุญาตโดยใช้การจำกัดความถี่ที่กำหนดไว้ใน ThrottlerModule
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(Authenticate)
  //     // .exclude({ path: '/auth/register', method: RequestMethod.POST })
  //     .forRoutes(AuthController); // ทุก path ของ AuthController
  //   // .forRoutes({ path: 'auth/register', method: RequestMethod.POST }); // เลือกเฉพาะ path
  // }
}
// export class AppModule {
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(Authenticate).forRoutes('*');
//   // }
//   //
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(Authenticate).forRoutes('auth');
//   // }
//   //
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(Authenticate)
//       .exclude(
//         // { path: 'auth', method: RequestMethod.GET },
//         { path: '/auth', method: RequestMethod.POST },
//         '/auth/register',
//       )
//       .forRoutes(AuthController);
//   }
//   //
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(Authenticate).forRoutes(AuthController);
//   // }
//   //
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer
//   //     .apply(Authenticate)
//   //     .forRoutes({ path: 'auth', method: RequestMethod.GET });
//   // //      .forRoutes({ path: 'auth', method: RequestMethod.ALL });
//   // }
// }
