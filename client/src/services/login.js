import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = `${process.env.REACT_APP_API_URL}login`;
const cookies = new Cookies();

export const loginUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    if (response.data.token) {
      cookies.set("jwtToken", response.data.token, { path: "/" });
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
