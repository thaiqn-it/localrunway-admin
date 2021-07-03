import { defaultInstance } from ".";

const getAllCategories = () => {
  return defaultInstance.get("/categories/");
};
const createNewCategory = (name) => {
  return defaultInstance.post("/categories", { name: name });
};
export const categoryApis = {
  getAllCategories,
  createNewCategory,
};
