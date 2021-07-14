import axios from "axios";
import { API_URL, getJWToken } from "../constants";

const defaultInstance = axios.create({
  baseURL: API_URL,
});

defaultInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${getJWToken()}`;

export { defaultInstance };
