import { defaultInstance } from "./index";

const addHashtag = (name) => {
  return defaultInstance.post("/hashtags/", { name: name });
};

export const hashtagApis = {
  addHashtag,
};
