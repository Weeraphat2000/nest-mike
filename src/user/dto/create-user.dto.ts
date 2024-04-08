import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString({ message: 'sting' }) // message ถ้ามัน error จะให้มันบอกว่าอะไร
  readonly description: string;

  @IsString()
  @Length(10, 20, { message: '10 - 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'password minimum eight characters, at least one letter and one number',
  })
  readonly password: string;

  // @IsEnum(['user', 'admin'], {message:"errrorrrrrr"})
  // role: string;
}

/*
  @IsNotEmpty({message:''})

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
