import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


export const getUserDetails = async (userId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user details for user ID ${userId}:`, error);
    throw error;
  }
};

export const createUser = async (userData: { name: string, email: string }) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const updateUser = async (userId: number, userData: { name: string; email: string }) => {
  try {
    const response = await axios.put(`${apiUrl}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${apiUrl}/users/${userId}`);
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};