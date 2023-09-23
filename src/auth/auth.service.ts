import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    console.log('email', username);

    const user = await this.userService.findOneByEmail(username);

    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user;
    return result;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user['dataValues'].email,
        id: user['dataValues'].id,
      }),
      user: user['dataValues'],
    };
  }

   signup(userInput: CreateUserInput) {
    return this.userService.create(userInput);
  }
}
