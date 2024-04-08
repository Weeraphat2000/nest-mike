import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cors()); // ต้องใช้นี่ด้วย
  // app.enableCors(); // เหมือนใช้ cors ของ express
  // ใน Nest.js, app.enableCors() และ app.use(cors()) มีหน้าที่เหมือนกัน คือการเปิดใช้งาน CORS (Cross-Origin Resource Sharing) เพื่ออนุญาตให้แอปพลิเคชันของคุณรับคำขอจากโดเมนอื่น ๆ โดยที่มีโดเมนต่างกัน
  // app.setGlobalPrefix('api') // คือ ทุก parth ต้องมี api
  //
  //
  // custom validationPipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // ตัด properties ของข้อมูลที่ส่งเข้ามาที่ไม่ได้นิยามไว้ใน DTO
  //     forbidNonWhitelisted: true, // จะทำงานคู่กับ whitelist
  //     transform: true,
  //     exceptionFactory: (error) => {
  //       // สร้างรูปแบบ error response
  //       const message = error.map((item) => ({
  //         field: item.property,
  //         message: Object.values(item.constraints).join('. ') + '.',
  //       }));
  //       return new BadRequestException({ error: message });
  //     },
  //   }),
  // ); // เพื่อให้ใช้ class validation ได้
  //
  //
  await app.listen(3001);
}
bootstrap();
