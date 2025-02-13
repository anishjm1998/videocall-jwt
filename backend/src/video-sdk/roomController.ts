import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RoomService } from './room.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID package

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createRoom(@Body('roomName') roomName: string) {
    const roomId = uuidv4(); // Generate a unique roomId
    return this.roomService.createRoom(roomId, roomName);
  }
}
