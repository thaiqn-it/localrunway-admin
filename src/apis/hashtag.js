import { defaultInstance } from ".";

const getAllHashtags = () => {
  return defaultInstance.get("/hashtags");
};

const postHashtag = (name) => {
  return defaultInstance.post("/hashtags", { name });
};
export const hashtagsApis = {
  getAllHashtags,
  postHashtag,
};
