import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect, useRef } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";
import { mediaApi } from "../../apis/media";
import classes from "./GeneralProduct.module.css";
import { hashtagsApis } from "../../apis/hashtag";
import CreateProductHashtag from "./CreateProductHashtag";
import { productHashtagApi } from "../../apis/productHastag";
import { localbrandsApis } from "../../apis/localbrands";
import ServerError from "../UI/ServerError";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function GeneralProduct({ update, handleNewProductSubmit }) {
  const history = useHistory();
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
  const [serverError, setServerError] = useState();
  const [error, setError] = useState({});

  const serverErrorMsg = "Server is not response";

  const productNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const onInit = async () => {
    try {
      const brandResponse = await localbrandsApis.getAuthInfo();
      setBrandId(brandResponse.data._id);
    } catch (err) {
      setServerError(serverErrorMsg);
    }

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
      handleServerError(serverErrorMsg);
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
      if (err.response.status != API_BAD_REQUEST) {
        handleServerError(serverErrorMsg);
      }
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
      } catch (err) {
        if (err.response.status != API_BAD_REQUEST) {
          handleServerError(serverErrorMsg);
        }
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let productCategoryId = haveNewCategory
      ? await createNewcategory()
      : categoryId;

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
      media: mediaUrlList,
      brandId: brandId,
      categoryId: productCategoryId,
    };

    try {
      const res = await productApis.addNewProduct(generalProduct);
      if (res.status === API_SUCCSES) {
        generalProduct = res.data.product;
        generalProduct.media = mediaUrlList;
        createProductHashtags(generalProduct._id);
        handleNewProductSubmit(generalProduct);
      }
    } catch (err) {
      if (err.response?.status === API_BAD_REQUEST) {
        const errorParams = err.response.data.errorParams;
        setError(errorParams);
      } else {
        handleServerError(serverErrorMsg);
      }
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
      } catch (err) {
        if (err.response.status != API_BAD_REQUEST) {
          handleServerError(serverErrorMsg);
        }
      }
    }
    mediaUrls = mediaUrls.map(
      (media) => (media = { mediaUrl: media, rank: 1 })
    );
    const tmp = [...mediaUrlList];
    tmp.push(...mediaUrls);

    setMediaUrlList(tmp);
    setThumbnailUrl(tmp[0].mediaUrl);
  };

  const handleImageDelete = (key) => {
    const tmp = [...mediaUrlList];
    tmp.splice(key, 1);
    setMediaUrlList(tmp);
    setThumbnailUrl(tmp[0]?.mediaUrl);
  };

  const handleServerError = (errorMsg) => {
    setServerError(errorMsg);
  };
  useEffect(() => {
    onInit();
  }, []);

  return (
    <>
      <div className={classes.container}>
        {serverError && (
          <ServerError
            errorMsg={serverError}
            onGoBack={() => history.push("/home")}
          />
        )}
        {!serverError && (
          <div>
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
                    <div
                      id="validationServer03Feedback"
                      class="invalid-feedback"
                    >
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
                    <div
                      id="validationServer03Feedback"
                      class="invalid-feedback"
                    >
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
                      error?.categoryId
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="category"
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                    placeholder=""
                  />
                  {error?.categoryId && (
                    <div
                      id="validationServer03Feedback"
                      class="invalid-feedback"
                    >
                      Don't leave blank on Category
                    </div>
                  )}
                </div>
              </div>

              <CreateProductHashtag
                handleHashtagsListChange={handleHashtagListChange}
                updateMode={update}
                handleServerError={handleServerError}
              />
              <div className="form-group has-validation">
                <label for="productName">Product 's Media</label>
                <input
                  className={
                    error?.thumbnailUrl
                      ? "form-control is-invalid"
                      : "form-control"
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
                {mediaUrlList.map((item, key) => {
                  return (
                    <div className={classes.image_container}>
                      <img
                        src={item.mediaUrl}
                        alt="mediaImg"
                        className={classes.image}
                      />
                      <div className={classes.delete_icon}>
                        <FontAwesomeIcon
                          onClick={() => handleImageDelete(key)}
                          icon={faTimesCircle}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button type="submit" class="btn btn-dark" onClick={handleSubmit}>
                Next
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
