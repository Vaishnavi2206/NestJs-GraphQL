import { Injectable, Inject } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly userRepository: typeof User,
  ) {}

  async create(userInput: CreateUserInput): Promise<User> {
    const user = new User();
    user.name = userInput.name;
    user.email = userInput.email;
    const hash =await bcrypt.hash(userInput.password, 10);
    user.password = hash;
    console.log(user);
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
