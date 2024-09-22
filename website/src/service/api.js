import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const post = async (url, data) => {
  const response = await axios.post(`${baseUrl}/${url}`, data);
  return response.data;
};
