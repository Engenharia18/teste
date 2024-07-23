import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  checkToken(token: string) {
    return this.jwtService.verify(token);
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.usersService.findByUsername(username);
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async login(user: LoginUserDto) {
    const validateUser = await this.validateUser(user);
    const payload = {
      username: validateUser.username,
      sub: validateUser,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const userExists = await this.usersService.findByUsername(user.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const userCreate = await this.usersService.create(user);
    return userCreate;
  }

  async update(id: number, user: UpdateUserDto) {
    const userExists = await this.usersService.findByID(id);
    if (userExists === null) {
      throw new BadRequestException('User not found');
    }
    const userUpdate = await this.usersService.update(id, user);
    return userUpdate;
  }
}
