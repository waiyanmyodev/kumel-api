import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { isPublic } from "../decorator/pubic.decorator";
@Injectable()
export class AdminJwtAuthGuard
  extends AuthGuard("admin-jwt")
  implements CanActivate
{
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }
    return <boolean>super.canActivate(context);
  }
}
