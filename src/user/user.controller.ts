import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  // private readonly userService: UserService; // ได้เหมือนกับ constructor

  constructor(private readonly userService: UserService) {}

  @Post()
  // ต้องใส่ validationPipe ด้วย class-validation ถึงจะทำงาน
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const newpassword = await bcrypt.hashSync(password, 10);
    createUserDto = { ...createUserDto, password: newpassword };
    const user = await this.userService.create(createUserDto);
    delete user.password;
    return user;
  }

  @Get()
  findAll() {
    console.log(v4()); // uuid v4
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);

    if (!user) {
      throw new NotFoundException('user id invalid');
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    // ต้องใส่ validationPipe ด้วย class-validation ถึงจะทำงาน
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const find = await this.userService.findOne(+id);
    if (!find) {
      throw new NotFoundException('user id invalid');
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const find = await this.userService.findOne(+id);
    console.log(find);
    if (!find) {
      throw new NotFoundException('user id invalid');
    }

    return await this.userService.remove(+id);
  }
}
