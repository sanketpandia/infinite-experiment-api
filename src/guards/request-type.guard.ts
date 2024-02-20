// request-type.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestType } from '../enums/request-type.enum';

@Injectable()
export class RequestTypeGuard implements CanActivate {
  constructor(private readonly requestType: RequestType) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-request-type'] === this.requestType;
  }
}
