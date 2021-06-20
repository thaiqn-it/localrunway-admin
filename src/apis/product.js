import { defaultInstance } from ".";

const getListProductByBrand = (brandId) => {
  return defaultInstance.get("/products/", { params: { brandIds: brandId } });
};

export const productApis = {
  getListProductByBrand,
};
