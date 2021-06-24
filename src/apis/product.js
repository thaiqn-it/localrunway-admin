import { defaultInstance } from ".";

const getListProductByBrand = (brandId, page) => {
  return defaultInstance.get("/products/", {
    params: { brandIds: brandId, page: page },
  });
};

const deleteProductById = (id) => {
  return defaultInstance.delete(`/products/${id}`);
};

const getProductById = (id) => {
  return defaultInstance.get(`/products/${id}`);
};

const updateProductById = (id, product) => {
  return defaultInstance.put(`/products/${id}`, product);
};

export const productApis = {
  getListProductByBrand,
  deleteProductById,
  getProductById,
  updateProductById,
};
