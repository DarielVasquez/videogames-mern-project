import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}`, newUser);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id, newUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, newUser);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
