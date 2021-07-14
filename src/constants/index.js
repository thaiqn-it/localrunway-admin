const JWT_TOKEN = "JWT_TOKEN";
const PRODUCT_DETAIL_ID = "PRODUCT_DETAIL_ID";
const LOCAL_BRAND_KEY = "LOCAL_BRAND";
const API_SUCCSES = 200;
const API_BAD_REQUEST = 400;
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export let JWT_TOKEN_VALUE = "";

export const getJWToken = () => {
  return (JWT_TOKEN_VALUE = localStorage.getItem(JWT_TOKEN));
};

export {
  JWT_TOKEN,
  API_SUCCSES,
  LOCAL_BRAND_KEY,
  API_BAD_REQUEST,
  PRODUCT_DETAIL_ID,
  API_URL,
};
