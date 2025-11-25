import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/registerUser.dto';

@Controller('auth') //auth/register
export class AuthController {
  // authService:AuthService;
  // constructor(authService:AuthService){
  //     this.authService= authService;
  // }

  // or

  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const result = await this.authService.registerUser(registerUserDto);

    return result;
  }
}
