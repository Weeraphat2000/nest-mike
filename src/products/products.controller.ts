import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(@Query('role') role?: string) {
    console.log(role, 'role');
    return this.productsService.getAllProducts();
  }
  @Get('/test')
  test(@Query() role?: string) {
    console.log(role, 'role');
    return role;
  }

  @Get('/:id')
  pip(@Param('id', ParseIntPipe) id: number) {
    console.log(id, 'id'); // ParseIntPipe จะทำให้เป็น Int เลย
    return id;
  }
  @Get('/array/:array')
  array(@Param('array', ParseArrayPipe) array: []) {
    console.log(array, 'array'); // ParseArrayPipe จะทำให้เป็น array เลย
    return array;
  }
  @Get('/bool/:bool')
  boolean(@Param('bool', ParseBoolPipe) bool: boolean) {
    console.log(bool, 'bool'); // ParseBoolPipe จะทำให้เป็น Boolean เลย ถ้าเป็น boolean ไม่ได้จะเป็น false ทันที
    return bool;
  }

  @Post()
  addProduct(@Body() body: { name: string; description: string }) {
    return this.productsService.addProduct(body);
  }

  // @Post()
  // // ProductCreateInput เหมือน DTO
  // addProduct(@Body() body: Prisma.ProductCreateInput) {
  //   return this.productsService.addProduct(body);
  // }

  @Patch('/:id')
  patch(
    // ทำได้เหมือนกัน แต่ ValidationPipe ไม่ได้
    @Body() body: Prisma.ProductUpdateInput,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log('first');
    return this.productsService.updateProduct(body, id);
  }
}
