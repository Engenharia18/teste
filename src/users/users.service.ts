import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createUser = this.usersRepository.create(user);
    createUser.password = bcrypt.hashSync(user.password, 10);
    if (!createUser) {
      throw new BadRequestException('User not created');
    }
    return this.usersRepository.save(createUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
    });

    if (!users) {
      return null;
    }
    return users;
  }

  async findByID(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'role', 'createdAt', 'updatedAt', 'password'],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const findUser = await this.findByID(id);
    if (findUser === null) {
      throw new BadRequestException('User not found');
    }
    await this.usersRepository.update(id, user);
    return this.findByID(id);
  }

  async remove(id: number): Promise<any> {
    const findUser = await this.findByID(id);
    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    findUser.addedProducts = [];
    await this.usersRepository.delete(id);

    return {
      message: 'User deleted',
    };
  }
}
