import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt'; // For password hashing (optional but recommended)

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // Inject UserModel
    private jwtService: JwtService,
  ) {}

  // Register user (no changes)
  async register(username: string, password: string, role: string) {
    const user = new this.userModel({ username, password, role });
    return user.save();
  }

  // Login user - generate access token and refresh token
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new Error('User not found');

    // Compare password (hash it if you are using hashed passwords)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { username: user.username, sub: user._id };

    // Generate access and refresh tokens
    const access_token = this.jwtService.sign(payload, { expiresIn: '60m' }); // 1 hour expiration
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' }); // 7 days expiration

    return {
      access_token,
      refresh_token, // Return both tokens
    };
  }

  // Refresh token: Generate new access token using refresh token
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken); // Verify the refresh token

      const user = await this.userModel.findById(payload.sub);
      if (!user) throw new Error('User not found');

      const newAccessToken = this.jwtService.sign({ username: user.username, sub: user._id }, { expiresIn: '60m' });

      return { access_token: newAccessToken };
    } catch (error) {
      throw new Error('Invalid refresh token or expired');
    }
  }
}
