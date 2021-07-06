import { defaultInstance } from "./index";

const uploadFie = (formData) => {
  return defaultInstance.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const mediaApi = {
  uploadFie,
};
