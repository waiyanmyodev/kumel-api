import { AllPermissions } from '../dto/all-permissions.dto'
import { SetMetadata } from '@nestjs/common'
export const PERMISSION_KEY = 'permissions'
export const Permissions = (...permissions: AllPermissions[]) => SetMetadata(PERMISSION_KEY, permissions)
