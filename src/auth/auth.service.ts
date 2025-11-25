import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  registerUser(registerUserDto: RegisterDto) {
    console.log('register Dto', registerUserDto);
    const hash=await bcrypt.hash(registerUserDto.password,10);


    return this.userService.createUser({..registerUserDto,password:hash});
    // return {message:'User registration logic here'};
  }
}
