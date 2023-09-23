import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from 'src/core/database/database.module';
import { usersProviders } from './users.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver,...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
