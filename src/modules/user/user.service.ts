import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, name: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.name = name;
    user.password = password; // You should hash the password before saving it
    return this.usersRepository.save(user);
  }
}
