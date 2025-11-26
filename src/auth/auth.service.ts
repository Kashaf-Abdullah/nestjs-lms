import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterDto) {
    console.log('register Dto', registerUserDto);
    const existingUser = await this.userService.findByEmail(
      registerUserDto.email,
    );

    if (existingUser) {
      return { message: 'Email already exists' };
    }

    const hash = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = { sub: user._id ,role:'admin'};
    const token = this.jwtService.signAsync(payload);
    console.log('Created User', user, token);
    return token;
    // return {user: user, message: 'User registered successfully'};
    // return {message:'User registration logic here'};
  }
  async login(body: any) {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);

    if (!user) return { message: 'User not found' };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return { message: 'Invalid credentials' };
    }

    const payload = { sub: user._id, email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: 'mysecretttkey',
      expiresIn: '1d',
    });

    return { message: 'Login successful', token };
  }
}
