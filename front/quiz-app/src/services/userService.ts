import axios from "axios";

const login = async (username: string, password: string) => {
  const response = await axios.post(`/api/user/login`, { username, password });
  return response.data;
};

const register = async (username: string, password: string, name: string) => {
  const response = await axios.post(`/api/user/register`, {
    username,
    password,
    name
  });
  return response.data;
};

export default { login, register };
