import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (username, password, role) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    password,
    role,
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const createRoom = async (roomId, roomName, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/create-room`,
    { roomId, roomName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchRoomDetails = async (roomId, token) => {
  const response = await axios.get(`${API_BASE_URL}/room/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};