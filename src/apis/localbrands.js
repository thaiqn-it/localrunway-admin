import { defaultInstance } from ".";

const login = (username, password) => {
  return defaultInstance.post("/localbrands/login", { username, password });
};

const getAuthInfo = (token) => {
  return defaultInstance.get("/localbrands/me", {
    headers: { Authorization: "Bearer " + token },
  });
};

export const localbrandsApis = {
  login,
  getAuthInfo,
};
