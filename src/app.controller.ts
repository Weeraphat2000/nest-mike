import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(ThrottlerGuard)
  // ThrottlerGuard จะถูกใช้เพื่อจำกัดการเข้าถึงที่เส้นทาง /example ในแอปพลิเคชัน NestJS ของคุณ โดยจำกัดความถี่ที่กำหนดไว้ใน ThrottlerModule ที่เรากำหนดไว้ใน AppModule
  getHello(): string {
    console.log('a');
    return this.appService.getHello();
  }
}
