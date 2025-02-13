import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register endpoint
  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.username, body.password, body.role);
  }

  // Login endpoint - returns both access and refresh token
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.username, body.password);
  }

  // Refresh token endpoint
  @Post('refresh')
  async refresh(@Body() body) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
