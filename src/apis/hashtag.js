import { defaultInstance } from ".";

const getAllHashtags = () => {
  return defaultInstance.get("/hashtags");
};

const addHashtag = (name) => {
  return defaultInstance.post("/hashtags", { name: name });
};
export const hashtagApis = {
  getAllHashtags,
  postHashtag: addHashtag,
};
