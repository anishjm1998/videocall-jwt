import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideoSdkModule } from './video-sdk/video-sdk.module';

@Module({
  imports: [AuthModule, UsersModule, VideoSdkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
