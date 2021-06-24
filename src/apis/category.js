import { defaultInstance } from ".";

const getAllCategories = () => {
    return defaultInstance.get("/categories/");
}

export const categoryApis = {
    getAllCategories,
}