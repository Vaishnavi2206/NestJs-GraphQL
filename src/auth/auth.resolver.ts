import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { User } from 'src/modules/users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Subscription } from '@nestjs/graphql';

const pubSub = new PubSub();
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('createUserInput') userInput: CreateUserInput) {
    const user =await this.authService.signup(userInput);
    const payload ={id:user["dataValues"].id,name:user["dataValues"].name,email:user["dataValues"].email};
    pubSub.publish('newUser', { newUser: payload });
    return user;
  }

  @Subscription(() => User)
  newUser() {
    return pubSub.asyncIterator('newUser');
  }
}
