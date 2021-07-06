import { defaultInstance } from ".";

const login = (username, password) => {
  return defaultInstance.post("/localbrands/login", { username, password });
};

const getAuthInfo = () => {
  return defaultInstance.get("/localbrands/me");
};

export const localbrandsApis = {
  login,
  getAuthInfo,
};
