import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}user`;

export const getUserById = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (updateUser) => {
  try {
    const response = await axios.put(API_URL, updateUser, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeUser = async () => {
  try {
    const response = await axios.delete(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
