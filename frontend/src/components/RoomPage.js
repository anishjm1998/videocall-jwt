import React, { useState } from 'react';
import { createRoom } from '../api/api';
import VideoCall from './VideoCall';
import { TextField, Button, Paper, Typography, Box, Container } from '@mui/material';

const RoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const handleCreateRoom = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await createRoom(roomId, roomName, token);
    console.log('Room created:', response);
    setIsRoomCreated(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {!isRoomCreated ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Create Room
          </Typography>
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              label="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRoom}
              >
                Create Room
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <VideoCall meetingId={roomId} />
      )}
    </Container>
  );
};

export default RoomPage;