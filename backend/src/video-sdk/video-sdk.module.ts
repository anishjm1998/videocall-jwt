import { Module } from '@nestjs/common';
import { VideoSdkService } from './video-sdk.service';

@Module({
  providers: [VideoSdkService]
})
export class VideoSdkModule {}
