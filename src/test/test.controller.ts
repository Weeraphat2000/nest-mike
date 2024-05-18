import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { find } from 'rxjs';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async findAll() {
    console.log('first');
    const findall = await this.testService.findAll(1);
    console.log(findall, 'findall');
    const find3 = await this.testService.findOne(1, 3);
    console.log(find3, 'find3');
    return { findall, find3 };
  }
}
