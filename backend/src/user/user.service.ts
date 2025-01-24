import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './enitiy/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserData(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'firstName', 'lastName']
    });

    if (!user) {
        throw new Error('User not found');
      }

    return {
        fname: user.firstName,
        email: user.email,
        id: user.id,
        lastName: user.lastName
      };
    }
  }