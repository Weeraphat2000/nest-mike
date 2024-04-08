import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // ตรวจสอบเงื่อนไขที่ต้องการ และส่งค่ากลับ
    return true; // หรือ false
  }
}
