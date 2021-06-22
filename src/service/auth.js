import { localbrandsApis } from "../apis/localbrands";
import { JWT_TOKEN } from "../constants";

const login = async (username, password) => {
  return await localbrandsApis.login(username, password);
};

const logout = () => {
  localStorage.removeItem(JWT_TOKEN);
};

const getAuthInfo = async (token) => {
  return await localbrandsApis.getAuthInfo(token);
};

export const authService = {
  login,
  logout,
  getAuthInfo,
};
