import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  @Min(1, { message: 'Number !!!' })
  readonly amount: number;

  @IsString()
  readonly title: string;
}

/*
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsDate()
  createDate: Date;

  @IsPositive()
*/
