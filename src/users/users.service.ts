import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  list(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role', 'transactions'] });
  }

  retrieve(id: number): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['role', 'transactions'] });
  }
}
