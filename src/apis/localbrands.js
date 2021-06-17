import { defaultInstance } from ".";

const login = (username, password) => {
  return defaultInstance.post("/localbrands/login", { username, password });
};

export const localbrandsApis = {
  login,
};
