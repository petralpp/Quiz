import axios from "axios";

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`/api/user/login`, { username, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

const register = async (username: string, password: string, name: string) => {
  try {
    const response = await axios.post(`/api/user/register`, {
      username,
      password,
      name
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

export default { login, register };
