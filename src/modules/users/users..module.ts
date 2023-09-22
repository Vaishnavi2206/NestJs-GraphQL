import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { usersProviders } from './user.provider';

@Module({
    providers: [UsersService, ...usersProviders],
    exports: [UsersService],
})
export class UsersModule {}
