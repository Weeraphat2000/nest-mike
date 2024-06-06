import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTestDto: CreateTestDto) {
    return this.prismaService.user.findMany();
  }

  findAll(amount?: number) {
    return this.prismaService.user.findMany({
      include: { Order: { where: { amount } } },
      // include: { Order: { where: { amount: { lte: amount } } } },
      // lte คือ less than or equal
      // lt คือ less than
      // gte คือ greater than or equal
      // gt คือ greater than
      // include: { Order: { where: { amount: { lt: amount } } } },
      take: 5,
    });
  }

  findOne(amount: number, userId: number) {
    return this.prismaService.user.findMany({
      include: { Order: { where: { userId, amount } } },
      take: 5,
    });
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
