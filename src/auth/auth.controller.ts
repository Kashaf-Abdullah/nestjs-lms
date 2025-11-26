import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guards';

@Controller('auth') //auth/register
export class AuthController {
  // authService:AuthService;
  // constructor(authService:AuthService){
  //     this.authService= authService;
  // }

  // or

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const result = await this.authService.registerUser(registerUserDto);

    return result;
  }
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    console.log('User ID from token:', userId);
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
