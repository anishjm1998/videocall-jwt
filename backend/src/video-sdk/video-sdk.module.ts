import { Module } from '@nestjs/common';
import { RoomController } from './roomController';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
})
export class VideoSdkModule {}