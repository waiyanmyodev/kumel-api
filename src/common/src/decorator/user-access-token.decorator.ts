import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ONE } from '../../../constants/constants'
import { InvalidAccessTokenException } from '../exception/general-exception'

export const UserAccessToken = createParamDecorator((_: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const accessToken = request.headers['authorization']
  if (!accessToken) {
    throw new InvalidAccessTokenException()
  }
  return accessToken.split(' ')[ONE]
})
