import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id: 1, name: 'product 1', description: 'description 1' },
    { id: 2, name: 'product 2', description: 'description 2' },
    { id: 3, name: 'product 3', description: 'description 3' },
    { id: 4, name: 'product 4', description: 'description 4' },
  ];

  // constructor(private readonly prismaService: PrismaService) {}
  constructor(private readonly prismaService: PrismaService) {} // ต้อง import ให้ถูกต้องกับ import หน้า module

  getAllProducts() {
    return this.prismaService.product.findMany();
  }

  async addProduct(data: { name: string; description: string }) {
    const result = await this.prismaService.product.create({ data });
    return result;
  }

  async updateProduct(data: Prisma.ProductUpdateInput, id: number) {
    return this.prismaService.product.update({ where: { id }, data });
  }
}
