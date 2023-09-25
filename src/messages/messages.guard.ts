import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UsersService,private authService:AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
    //  get authToken and verify user
    } catch (err) {
    //   throw error
    }
  }
}
