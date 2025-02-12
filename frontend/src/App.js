import React from 'react';
import AuthForm from './components/AuthForm';
import RoomPage from './components/RoomPage';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">VideoSDK + JWT Integration</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {!isAuthenticated ? <AuthForm /> : <RoomPage />}
      </Container>
    </div>
  );
};

export default App;