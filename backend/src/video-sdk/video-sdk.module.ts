// video-sdk.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule here

@Module({
  imports: [AuthModule], // Import the AuthModule
})
export class VideoSdkModule {}
