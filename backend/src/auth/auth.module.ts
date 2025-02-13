import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module'; // 👈 Import UserModule

@Module({
  imports: [
    UserModule, // 👈 Import UserModule so AuthService can access UserModel
    JwtModule.register({
      secret: 'my_super_secret_key_12345',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
