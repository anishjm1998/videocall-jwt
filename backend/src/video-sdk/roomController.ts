import { Controller, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create') 
  async createRoom(@Body() body: { roomId: string; roomName: string }) {
    const { roomId, roomName } = body;
    return this.roomService.createRoom(roomId, roomName);
  }
}