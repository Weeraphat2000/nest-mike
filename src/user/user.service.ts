import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class UserService {
  // private prismaService: PrismaService; // ทำได้เหมือนกัน จะได้ไม่ต้องไปประกาศบน constructor
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany({ include: { Order: true } });
  }

  async findOne(id: number) {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    // try {
    return await this.prismaService.user.delete({
      where: { id },
      include: { Order: true },
    });
    // } catch (error) {
    //   throw new NotFoundException('invalid user id');
    // }
  }

  async finduser(name: string) {
    return await this.prismaService.user.findFirst({ where: { name } });
  }
}
