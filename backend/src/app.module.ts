import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { VideoSdkModule } from './video-sdk/video-sdk.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UserModule,
    VideoSdkModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('✅ Connected to MongoDB'); // Log when connected
  }
}
