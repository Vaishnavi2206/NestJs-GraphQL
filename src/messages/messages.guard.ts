import { CanActivate, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    try {
      //  get authToken and verify user
    } catch (err) {
      //   throw error
    }
  }
}
