const JWT_TOKEN = "JWT_TOKEN";
const LOCAL_BRAND_KEY = "LOCAL_BRAND";
const API_SUCCSES = 200;

export let JWT_TOKEN_VALUE = "";

export const getJWToken = () => {
  return (JWT_TOKEN_VALUE = localStorage.getItem(JWT_TOKEN));
};

export { JWT_TOKEN, API_SUCCSES, LOCAL_BRAND_KEY };
