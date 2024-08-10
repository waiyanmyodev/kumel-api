import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common'
import { EMPTY_STRING } from '../../../constants/constants'
import { Observable } from 'rxjs'

interface successResponse<T> {
  status: string
  data: T
}

@Injectable()
export class UpdateIdAddInterceptor<T> implements NestInterceptor<T, successResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<successResponse<T>> {
    this.addIdToRequest(context)
    return next.handle()
  }

  private addIdToRequest(context: ExecutionContext): void {
    const request = context.switchToHttp().getRequest()
    const params = request?.params
    const routeParamArr = Object.keys(params)
    const routeParam = routeParamArr.length > 0 ? params[Object.keys(params)[0]] : EMPTY_STRING
    if (!params || !routeParam) {
      throw new NotFoundException('Route param not found!')
    }
    request.body['id'] = routeParam
  }
}
