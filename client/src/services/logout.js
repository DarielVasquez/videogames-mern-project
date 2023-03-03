import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}logout`;

export const logoutUser = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
