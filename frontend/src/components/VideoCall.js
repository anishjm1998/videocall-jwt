import React from 'react';
import { MeetingProvider, MeetingConsumer, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { Grid, Button, IconButton, Paper, Typography, Box, Container, AppBar, Toolbar } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, CallEnd } from '@mui/icons-material';

// Participant Tile Component
const ParticipantTile = ({ participant }) => {
  const { webcamStream, micStream, isLocal } = useParticipant(participant.id);

  return (
    <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>
        {isLocal ? 'You' : participant.displayName}
      </Typography>
      <video
        autoPlay
        muted={isLocal}
        style={{ width: '100%', borderRadius: '8px' }}
        ref={(el) => {
          if (el && webcamStream) {
            el.srcObject = new MediaStream([webcamStream.track]);
          }
        }}
      />
      <Box mt={2}>
        <IconButton color={micStream ? 'primary' : 'secondary'} aria-label="mic">
          {micStream ? <Mic /> : <MicOff />}
        </IconButton>
        <IconButton color={webcamStream ? 'primary' : 'secondary'} aria-label="camera">
          {webcamStream ? <Videocam /> : <VideocamOff />}
        </IconButton>
      </Box>
    </Paper>
  );
};

// Video Call UI Component
const VideoCallUI = ({ meetingId }) => {
  const { join, leave, toggleMic, toggleWebcam, participants } = useMeeting();

  const handleJoin = () => {
    join();
  };

  const handleLeave = () => {
    leave();
    window.location.reload(); // Refresh the page after leaving
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Video Call: {meetingId}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {[...participants.keys()].map((participantId) => (
            <Grid item xs={12} sm={6} md={4} key={participantId}>
              <ParticipantTile participant={participants.get(participantId)} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Mic />}
            onClick={toggleMic}
          >
            Toggle Mic
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Videocam />}
            onClick={toggleWebcam}
          >
            Toggle Webcam
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CallEnd />}
            onClick={handleLeave}
          >
            Leave Call
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

// Main VideoCall Component
const VideoCall = ({ meetingId }) => {
  const token = localStorage.getItem('accessToken');

  return (
    <MeetingProvider
      config={{
        meetingId,
        name: 'Your Name',
        token,
      }}
    >
      <MeetingConsumer>
        {() => <VideoCallUI meetingId={meetingId} />}
      </MeetingConsumer>
    </MeetingProvider>
  );
};

export default VideoCall;