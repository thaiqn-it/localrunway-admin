import { defaultInstance } from ".";

const createProductHastag = (hashtagId, productId) => {
  return defaultInstance.post(`/products/${productId}/hashtags`, { hashtagId });
};
const deleteProductHashtag = (hashtagId, productId) => {
  return defaultInstance.delete(`/products/${productId}/hashtags/${hashtagId}`);
};

export const productHashtagApi = {
  createProductHastag,
  deleteProductHashtag,
};
