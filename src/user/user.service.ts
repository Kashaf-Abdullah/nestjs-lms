import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';   // import model interface
import { RegisterDto } from 'src/dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(registerUserDto: RegisterDto) {
    try{
    return await this.userModel.create({
      fname: registerUserDto.fname,
      lname: registerUserDto.lname,
      email: registerUserDto.email,
      password: registerUserDto.password,
    });
}
catch(err){
  console.log('Error creating user:', err);
  throw err;
  }
}
async findByEmail(email: string) {
  return await this.userModel.findOne({ email });
}

}