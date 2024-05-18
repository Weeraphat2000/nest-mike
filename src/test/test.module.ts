import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [PrismaModule],
})
export class TestModule {}
