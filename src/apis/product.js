import { defaultInstance } from ".";

const getListProductByBrand = (brandId, page) => {
  return defaultInstance.get("/products/", {
    params: { brandIds: brandId, page: page },
  });
};

export const productApis = {
  getListProductByBrand,
};
