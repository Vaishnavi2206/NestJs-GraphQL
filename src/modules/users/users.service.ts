import { Injectable, Inject } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly userRepository: typeof User,
  ) {}

  async create(userInput: CreateUserInput): Promise<User> {
    const user = new User();
    user.name = userInput.name;
    user.email = userInput.email;
    user.password = userInput.password;

    return user.save();
  }

  async findAll() {
    const users = await this.userRepository.findAll<User>();
    return users;
  }

  findOneById(id: any) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
