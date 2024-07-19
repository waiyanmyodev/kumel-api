import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSION_KEY } from "../decorator/permissions.decorator";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class PermissionsGuard
  extends AuthGuard("master-jwt")
  implements CanActivate
{
  constructor(private readonly reflector: Reflector) {
    super();
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()]
    );
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    if (!requiredPermissions) {
      return true;
    }

    const userPermissions = user.permissions.map(
      (permission) => permission.name
    );
    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );
    return hasPermission;
  }
}
