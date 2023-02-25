import axios from "axios";

const API_URL = "http://localhost:5000/api/favorites";

export const getFavoritesByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addFavorite = async (id, newFavorite) => {
  try {
    const response = await axios.post(`${API_URL}/${id}`, newFavorite);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavorite = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
