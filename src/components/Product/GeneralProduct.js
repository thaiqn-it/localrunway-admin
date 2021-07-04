import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect, useRef } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";
import { mediaApi } from "../../apis/media";
import classes from "./CreateProduct.module.css";
import { hashtagsApis } from "../../apis/hashtag";
import CreateProductHashtag from "./CreateProductHashtag";
import { productHashtagApi } from "../../apis/productHastag";
import { localbrandsApis } from "../../apis/localbrands";
export default function GeneralProduct({ update, handleNewProductSubmit }) {
  const productStatus = { active: "ACTIVE", inactive: "INACTIVE" };
  const productType = { generalProduct: "GP" };
  const [productId, setProductId] = useState();

  const [brandId, setBrandId] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [haveNewCategory, setHaveNewCategory] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categorySuggetionList, setCategorySuggetionList] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mediaUrlList, setMediaUrlList] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const [error, setError] = useState({});
  const productNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const onInit = async () => {
    const brandResponse = await localbrandsApis.getAuthInfo();
    setBrandId(brandResponse.data._id);
    await getCategorySuggetionList();
  };
  const handleNewCategoryChange = (event) => {
    setHaveNewCategory(true);
    setNewCategory(event.target.value);
    setCategoryId("");
  };

  const getCategorySuggetionList = async () => {
    try {
      const res = await categoryApis.getAllCategories();
      if (res.status === API_SUCCSES) {
        const categoryList = res.data.categories;
        setCategorySuggetionList(categoryList);
      }
    } catch (err) {
      //error handle later
    }
  };

  const handleCategorySuggetionChange = (event) => {
    setCategoryId(event.target.value);
    setNewCategory("");
    setHaveNewCategory(false);
  };

  const createNewcategory = async () => {
    try {
      const res = await categoryApis.createNewCategory(newCategory);
      if (res.status === API_SUCCSES) {
        return res.data.category._id;
      }
    } catch (err) {
      //handle error later
      console.log(err.response);
    }
  };

  const handleHashtagListChange = (hashtags) => {
    setHashtags(hashtags);
  };

  const createProductHashtags = async (productId) => {
    hashtags.map(async (hashtag) => {
      try {
        const res = await productHashtagApi.createProductHastag(
          hashtag._id,
          productId
        );
        if (res.status === API_SUCCSES) {
          hashtag = {
            ...hashtag,
            productHashtagId: res.data.productHashtag._id,
          };
        }
      } catch (err) {}
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let productCategoryId = haveNewCategory
      ? await createNewcategory()
      : categoryId;

    console.log("Submit");
    const media = [...mediaUrlList].map(
      (media) => (media = { mediaUrl: media, rank: 1 })
    );

    let generalProduct = {
      name: productName,
      color: "color",
      size: 0,
      price: 0,
      quantity: 0,
      status: productStatus.active,
      type: productType.generalProduct,
      description: description,
      thumbnailUrl: thumbnailUrl,
      media: media,
      brandId: brandId,
      categoryId: productCategoryId,
    };
    console.log(generalProduct);
    try {
      const res = await productApis.addNewProduct(generalProduct);
      if (res.status === API_SUCCSES) {
        console.log(res);
        generalProduct = res.data.product;
        createProductHashtags(generalProduct._id);
        handleNewProductSubmit(generalProduct);
      }
    } catch (err) {
      console.log(err.response);
      const errorParams = err.response.data.errorParams;
      setError(errorParams);
    }
  };
  const mediaFileInputHandler = async (event) => {
    const files = event.target.files;
    let mediaUrls = [];
    for (const file of files) {
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const res = await mediaApi.uploadFie(formdata);
        mediaUrls.push(res.data.publicUrl);
      } catch (err) {}
    }
    setMediaUrlList(mediaUrls);
    setThumbnailUrl(mediaUrls[0]);
  };
  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    console.log(brandId);
  }, [brandId]);

  return (
    <>
      <div className={classes.container}>
        <h1>General Infomation</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-md-10 has-validation">
              <label for="productName">Product Name</label>
              <input
                type="text"
                className={
                  error?.name ? "form-control is-invalid" : "form-control"
                }
                id="productName"
                onChange={productNameChangeHandler}
                value={productName}
                placeholder=""
              />
              {error?.name && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error.name}
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-10 has-validation">
              <label for="description">Description</label>
              <textarea
                type="text"
                className={
                  error?.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="description"
                value={description}
                onChange={descriptionChangeHandler}
                placeholder=""
              />
              {error?.description && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error.description}
                </div>
              )}
            </div>
          </div>
          <div className="form-row ">
            <div className="form-group col-md-5">
              <label for="category">Category</label>

              <select
                class="form-control "
                aria-label=".form-select-lg example"
                onChange={handleCategorySuggetionChange}
                value={categoryId}
              >
                <option value={""}>Choose a category</option>
                {categorySuggetionList.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group has-validation col-md-5">
              <label for="Category">Or Add New Category</label>
              <input
                type="text"
                className={
                  error?.categoryId ? "form-control is-invalid" : "form-control"
                }
                id="category"
                value={newCategory}
                onChange={handleNewCategoryChange}
                placeholder=""
              />
              {error?.categoryId && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  Don't leave blank on Category
                </div>
              )}
            </div>
          </div>

          <CreateProductHashtag
            handleHashtagsListChange={handleHashtagListChange}
            updateMode={update}
          />
          <div className="form-group has-validation">
            <label for="productName">Product 's Media</label>
            <input
              className={
                error?.thumbnailUrl ? "form-control is-invalid" : "form-control"
              }
              type="file"
              accept="image/*"
              multiple={true}
              onChange={mediaFileInputHandler}
            />
            {error?.thumbnailUrl && (
              <div id="validationServer03Feedback" class="invalid-feedback">
                Please add at least 1 image
              </div>
            )}
          </div>
          <div className="form-row">
            <img src={thumbnailUrl} />
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Next
          </button>
        </form>
      </div>
    </>
  );
}
