import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.username, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.username, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return this.authService.refreshToken(body.refreshToken);
  }
}