import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // export ให้ module อื่นใช้งานได้ด้วย
  // เวลาคนอื่นจะเอาไปใช้งานก็ต้องเอาไปใส่ตีง import
})
export class PrismaModule {}