import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect, useRef } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";

import classes from "./CreateProduct.module.css";
import { hashtagsApis } from "../../apis/hashtag";
export default function NewGeneralProduct({ setGeneralProduct }) {
  const appCtx = useContext(AppContext);

  const submitError = {
    productName: null,
    description: null,

    categoryId: null,
  };

  const productStatus = { active: "ACTIVE", inactive: "INACTIVE" };
  const productType = { generalProduct: "GP" };
  const [productId, setProductId] = useState(null);

  const [brandId, setbrandId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [haveNewCategory, setHaveNewCategory] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categorySuggetionList, setCategorySuggetionList] = useState([]);

  const [error, setError] = useState(submitError);
  const [showNextButtom, setShowNextButtom] = useState(true);

  const productNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const handleMediaSubmit = (event) => {
    //return dummy data
    return [
      {
        mediaUrl:
          "https://firebasestorage.googleapis.com/v0/b/image-e6757.appspot.com/o/jacket-ontop-local-brand-viet-nam.2jpg-800x800.jpg?alt=media&token=4f02c71e-1c7a-45d0-abc9-c5885ebb055a",
        rank: 1,
      },
    ];
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

  const handleSubmit = async () => {
    setError(submitError);
    setShowNextButtom(false);
    let productCategoryId = haveNewCategory
      ? await createNewcategory()
      : categoryId;

    if (brandId != "") {
      const dummyMedia = handleMediaSubmit();
      try {
        const generalProduct = {
          name: productName,
          color: "color",
          size: 0,
          price: 0,
          quantity: 0,
          status: productStatus.active,
          type: productType.generalProduct,
          description,
          thumbnailUrl:
            "https://firebasestorage.googleapis.com/v0/b/image-e6757.appspot.com/o/jacket-ontop-local-brand-viet-nam.2jpg-800x800.jpg?alt=media&token=4f02c71e-1c7a-45d0-abc9-c5885ebb055a",
          media: dummyMedia,
          brandId: brandId,
          categoryId: productCategoryId,
        };
        const res =
          productId === null
            ? await productApis.postRootProduct(generalProduct)
            : await productApis.updateProductById(generalProduct);

        if (res.status === API_SUCCSES) {
          setProductId(res.data._id);
          setGeneralProduct(res.data);
        }
      } catch (err) {
        if (err.response.status === API_BAD_REQUEST) {
          const errorParams = err.response.data.errorParams;
          console.log(errorParams);
          setError({
            productName: errorParams.name,
            description: errorParams.description,
            price: errorParams.price,
            categoryId: errorParams.categoryId,
          });
        }
        if (err.response.status === 500) {
        }
      }
    }
  };

  useEffect(() => {
    let brandId = appCtx.localbrand === null ? "" : appCtx.localbrand._id;
    setbrandId(brandId);
    getCategorySuggetionList();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h1>General Infomation</h1>
        <div className="form-group has-validation">
          <label for="productName">Product Name</label>
          <input
            type="text"
            className={
              error.productName != null
                ? "form-control is-invalid"
                : "form-control"
            }
            id="productName"
            onChange={productNameChangeHandler}
            value={productName}
            placeholder=""
          />
          {error.productName != null && (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.productName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            className={
              error.description != null
                ? "form-control is-invalid"
                : "form-control"
            }
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
            placeholder=""
          />
          {error.description != null && (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.description}
            </div>
          )}
        </div>
        <div className="form-group">
          <label for="category">Category</label>

          <select
            class="form-control form-control-lg"
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
        <div className="form-group has-validation">
          <label for="Category">Choose your other category</label>
          <input
            type="text"
            className={
              error.categoryId != null
                ? "form-control is-invalid"
                : "form-control"
            }
            id="category"
            value={newCategory}
            onChange={handleNewCategoryChange}
            placeholder=""
          />
          {error.categoryId != null && (
            <div id="validationServer03Feedback" class="invalid-feedback">
              Don't leave blank on Category
            </div>
          )}
        </div>
        {showNextButtom && (
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Next
          </button>
        )}
      </div>
    </>
  );
}
