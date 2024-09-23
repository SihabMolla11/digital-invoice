import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const post = async (url, data) => {
  const response = await axios.post(`${baseUrl}/${url}`, data);
  return response.data;
};

export const get = async (url) => {
  const response = await axios.get(`${baseUrl}/${url}`);
  return response.data;
};


export const deleteRequest = async (url) => {
  const response = await axios.delete(`${baseUrl}/${url}`);
  return response.data;
};