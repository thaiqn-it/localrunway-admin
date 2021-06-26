import axios from "axios";
import { getJWToken } from "../constants";

const API_URL = "http://localhost:3000/api";

const defaultInstance = axios.create({
  baseURL: API_URL,
});

defaultInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${getJWToken()}`;

export { defaultInstance };
