import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { generateToken } from './generateToken';

@Injectable()
export class RoomService {
  async createRoom(roomId: string, roomName: string): Promise<any> {
    const token = generateToken();
    const response = await axios.post(
      'https://api.videosdk.live/v2/rooms',
      { roomId, roomName },
      { headers: { Authorization: token } },
    );
    return response.data;
  }
}