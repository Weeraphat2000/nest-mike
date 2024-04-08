import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  amount?: number;

  @IsString()
  @IsOptional()
  title?: string;
}
