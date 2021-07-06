import { defaultInstance } from ".";

const getListProductByBrand = (brandId, page, type) => {
  return defaultInstance.get("/products", {
    params: {
      brandIds: brandId,
      page: page,
      type: type,
    },
  });
};

const getChildrenProducts = (parentId) => {
  return defaultInstance.get("/products", {
    params: {
      parentId,
    },
  });
};

const deleteProductById = (id) => {
  return defaultInstance.delete(`/products/${id}`);
};

const getProductById = (id) => {
  return defaultInstance.get(`/products/${id}`);
};

const getProductHashtags = (id) => {
  return defaultInstance.get(`/products/${id}/hashtags`);
};

const updateProductById = (id, product) => {
  return defaultInstance.put(`/products/${id}/`, product);
};

const addProductHashtag = (id, hashtagId) => {
  return defaultInstance.post(`/products/${id}/hashtags`, { hashtagId });
};

const deleteProductHashtag = (id, hashtagId) => {
  console.log(id, hashtagId);
  return defaultInstance.delete(`/products/${id}/hashtags/${hashtagId}`);
};

const addNewProduct = (product) => {
  return defaultInstance.post("/products", { ...product });
};
export const productApis = {
  getListProductByBrand,
  deleteProductById,
  getProductById,
  updateProductById,
  getProductHashtags,
  getChildrenProducts,
  addProductHashtag,
  deleteProductHashtag,
  addNewProduct,
};
