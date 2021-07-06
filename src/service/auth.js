import { localbrandsApis } from "../apis/localbrands";
import { JWT_TOKEN } from "../constants";

const login = async (username, password) => {
  return await localbrandsApis.login(username, password);
};

const logout = () => {
  localStorage.removeItem(JWT_TOKEN);
};

const getAuthInfo = async () => {
  return await localbrandsApis.getAuthInfo();
};

export const authService = {
  login,
  logout,
  getAuthInfo,
};
