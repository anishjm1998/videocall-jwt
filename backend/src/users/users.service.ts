import { Injectable } from '@nestjs/common';
import { User } from './user.entity';  // Make sure this is your correct User model
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(username: string, hashedPassword: string, role: string) {
    const newUser = new this.userModel({ username, password: hashedPassword, role });
    return await newUser.save();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
