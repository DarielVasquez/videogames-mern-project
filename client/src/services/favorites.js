import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}favorites`;

export const getFavorites = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addFavorite = async (newFavorite) => {
  try {
    const response = await axios.post(API_URL, newFavorite, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFavorites = async (arrayFavorites) => {
  try {
    const response = await axios.patch(API_URL, arrayFavorites, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavorite = async (gameId) => {
  try {
    const response = await axios.delete(API_URL, {
      data: {
        gameId,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
