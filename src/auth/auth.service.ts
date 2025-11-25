import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterDto) {
    console.log('register Dto', registerUserDto);
    const existingUser = await this.userService.findByEmail(registerUserDto.email);

  if (existingUser) {
    return { message: 'Email already exists' };
  }

    const hash = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    console.log('Created User', user);

    return {user: user, message: 'User registered successfully'};
    // return {message:'User registration logic here'};
  }
}
