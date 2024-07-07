import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSION_KEY } from '../decorator/permissions.decorator'
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredPermissions) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requiredPermissions.some(permission => user.accountType.permissions.includes(permission))
  }
}
