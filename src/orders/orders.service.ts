import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const findeUser = await this.prismaService.user.findFirst({
      where: { id: createOrderDto.userId },
    });
    if (!findeUser) {
      throw new NotFoundException('user id invalid');
    }
    return this.prismaService.order.create({ data: createOrderDto });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  async findOne(id: number) {
    const result = await this.prismaService.order.findFirst({ where: { id } });
    if (!result) {
      throw new NotFoundException('order id invalid');
    }
    return result;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const result = await this.prismaService.order.findFirst({ where: { id } });
    if (!result) {
      throw new NotFoundException('order id invalid');
    }
    const response = await this.prismaService.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return response;
  }

  async remove(id: number) {
    const result = await this.prismaService.order.findFirst({ where: { id } });
    if (!result) {
      throw new NotFoundException('order id invalid');
    }
    await this.prismaService.order.delete({ where: { id } });
    return `This action removes a #${id} order`;
  }
}
