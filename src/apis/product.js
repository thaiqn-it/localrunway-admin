import { defaultInstance } from ".";

const getListProductByBrand = (brandId, page, type) => {
  return defaultInstance.get("/products/", {
    params: {
      brandIds: brandId,
      page: page,
      type: type,
    },
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
