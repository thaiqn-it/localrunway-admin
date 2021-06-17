import axios from "axios";

const API_URL = "http://localhost:3000/api";

const defaultInstance = axios.create({
  baseURL: API_URL,
});
// defaultInstance.defaults.headers.common["Access-Control-Allow-Origin"] = true;
// console.log(defaultInstance.defaults.headers);
export { defaultInstance };
