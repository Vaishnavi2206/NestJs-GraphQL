import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UseGuards } from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey("all-users")
  @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard) //undo
  findAll() {
    //protect with JWT
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }
}
