import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, role: string) {
    return this.usersService.createUser(username, password, role);
  }

  async login(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    return {
      accessToken: this.jwtService.sign({ ...payload, sub: payload.sub }),
    };
  }
}