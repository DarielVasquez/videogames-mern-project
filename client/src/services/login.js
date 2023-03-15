import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}login`;

export const loginUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const isUserLogged = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUserOAuth = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/oauth`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
