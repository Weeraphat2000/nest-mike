import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule], // import module เข้าก็ใช้งา นได้แล้ว หรือ import PrismaService เข้าไปที่ providers เพื่อใช้งาน prismaService
})
export class ProductsModule {}
