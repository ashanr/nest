import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, name: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.name = name;

    // Hash the password before saving it
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await this.usersRepository.save(user);
    this.logger.log(`User ${savedUser.id} created`);
    return savedUser;
  }
}
