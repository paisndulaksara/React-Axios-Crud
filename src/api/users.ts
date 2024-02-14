/* Importing the `axios` library, which is a popular
JavaScript library used for making HTTP requests. */
import axios from 'axios';


/* const apiUrl is assigning the value of the environment
variable `VITE_API_URL` to the `apiUrl` constant. */
const apiUrl = import.meta.env.VITE_API_URL;

/**
 The getUsers function is returning the data from the API response.
 */
export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


/**
 * The function `getUserDetails` is an asynchronous function that fetches user details from an API
 * using the provided user ID.
 */
export const getUserDetails = async (userId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user details for user ID ${userId}:`, error);
    throw error;
  }
};

/**
 * The function `createUser` is an asynchronous function that sends a POST request to create a new user
 * with the provided user data, and returns the response data.
 */
export const createUser = async (userData: { name: string, email: string }) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * The function `updateUser` updates a user's data by making a PUT request to the API endpoint with the
 * provided user ID and user data.
 */
export const updateUser = async (userId: number, userData: { name: string; email: string }) => {
  try {
    const response = await axios.put(`${apiUrl}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * The deleteUser function deletes a user with the specified userId 
 */
export const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${apiUrl}/users/${userId}`);
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};