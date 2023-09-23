import { Injectable, Inject } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
// import { User } from 'src/modules/users/user.entity';
import { User } from './entities/user.entity';
import { Model } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    // @Inject(User.name)
    // private userRepository: Model<User>
    // @InjectModel(User)
    // private readonly userRepository: Model<User>
    @Inject('UsersRepository') private readonly userRepository: typeof User,
  ) {}

  async create(userInput: CreateUserInput): Promise<User> {
    const user = new User();
    let dataSaved: any;
    user.name = userInput.name;
    user.email = userInput.email;
    user.password = userInput.password;

    return user
      .save()
      .then((data) => {
        dataSaved = data;
        return dataSaved.dataValues;
      })
      .catch((error) => {});
  }

  async findAll() {
    const users = await this.userRepository.findAll<User>();
    return users;
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
