import React, { useState, useEffect } from "react";
import { mediaApi } from "../../apis/media";
import { productApis } from "../../apis/product";
import classes from "./NewProductDetail.module.css";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import {
  PRODUCT_TYPE,
  STATUS_TYPE,
} from "../../constants/control-default-value";
import ServerError from "../UI/ServerError";
import { useHistory } from "react-router-dom";
import { event } from "jquery";

export default function NewProductDetail({
  productDetail,
  index,
  handleDetailChange,
  handleDetailDelete,
  generalProduct,
}) {
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [productId, setProductId] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [error, setError] = useState();
  const [serverError, setServerError] = useState();

  const onInit = () => {
    if (productDetail._id != null) {
      setProductId(productDetail._id);
      setIsUpdate(true);
      setThumbnailUrl(productDetail.thumbnailUrl);
    }

    setColor(productDetail.color);
    setSize(productDetail.size);
    setQuantity(productDetail.quantity);
    setPrice(productDetail.price);
  };
  const colorChangeHandle = (event) => {
    setColor(event.target.value);
  };
  const sizeChangeHandle = (event) => {
    setSize(event.target.value);
  };

  const priceChangeHandle = (event) => {
    setPrice(event.target.value);
  };

  const quantityChangeHandle = (event) => {
    setQuantity(event.target.value);
  };

  const thumbnailChangeHandle = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await mediaApi.uploadFie(formdata);
      if (res.status === API_SUCCSES) {
        const thumbnailUrl = res.data.publicUrl;

        setThumbnailUrl(thumbnailUrl);
      }
    } catch (err) {
      handleServerError(error.response.data.error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    let detail = {
      name: generalProduct.name,
      color: color,
      size: size,
      price: price,
      quantity: quantity,
      status: "ACTIVE",
      type: "DP",
      description: generalProduct.description,
      thumbnailUrl: thumbnailUrl,
      media: generalProduct.media,
      brandId: generalProduct.brandId,
      categoryId: generalProduct.categoryId,
      parentId: generalProduct._id,
    };

    try {
      const res = isUpdate
        ? await productApis.updateProductById(productId, detail)
        : await productApis.addNewProduct(detail);
      if (res.status === API_SUCCSES) {
        detail = res.data.product;

        handleDetailChange(detail, index);
      }
    } catch (err) {
      const errorParams = err.response.data.errorParams;

      setError(errorParams);
    }
  };
  const handleDelete = () => {
    handleDetailDelete(index);
  };
  const handleImageDelete = () => {
    setThumbnailUrl();
  };
  const handleServerError = (error) => {
    setServerError(error);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <>
      {serverError && (
        <ServerError
          errorMsg={serverError}
          onGoBack={() => history.push("/home")}
        />
      )}
      {!serverError && (
        <div>
          <div className="form-row">
            <div className="form-group col-md-1">
              <label for="productName">Product Size</label>
              <input
                type="text"
                className={
                  error?.size ? "form-control is-invalid" : "form-control"
                }
                id="size"
                onChange={sizeChangeHandle}
                placeholder=""
                value={size}
              />
              {error?.size && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error?.size}
                </div>
              )}
            </div>
            <div className="form-group has-validation col-md-1">
              <label for="productColor">Product Color</label>
              <input
                type="text"
                className={
                  error?.color ? "form-control is-invalid" : "form-control"
                }
                id="productColor"
                onChange={colorChangeHandle}
                placeholder=""
                value={color}
              />
              {error?.color && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error.color}
                </div>
              )}
            </div>
            <div className="form-group has-validation col-md-2">
              <label for="productName">Product Quantity</label>
              <input
                type="text"
                className={
                  error?.quantity ? "form-control is-invalid" : "form-control"
                }
                id="quantity"
                onChange={quantityChangeHandle}
                placeholder=""
                value={quantity}
              />
              {error?.quantity && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error.quantity}
                </div>
              )}
            </div>
            <div className="form-group has-validation col-md-2">
              <label for="productName">Product Price</label>
              <input
                type="text"
                className={
                  error?.price ? "form-control is-invalid" : "form-control"
                }
                id="price"
                onChange={priceChangeHandle}
                placeholder=""
                value={price}
              />
              {error?.price && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  {error.price}
                </div>
              )}
            </div>
            <div className="form-group has-validation col-md-2">
              <label for="productName">Product Thumbnail</label>

              <input
                className={
                  error?.thumbnailUrl
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="file"
                accept="image/*"
                onChange={(event) => {
                  thumbnailChangeHandle(event.target.files[0]);
                }}
              />
              {error?.thumbnailUrl && (
                <div id="validationServer03Feedback" class="invalid-feedback">
                  Please add at least 1 image
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            {thumbnailUrl && (
              <div className={classes.image_container}>
                <img
                  src={thumbnailUrl}
                  alt="mediaImg"
                  className={classes.image}
                />
                <div
                  className={classes.delete}
                  type="button"
                  onClick={() => handleImageDelete()}
                >
                  x
                </div>
              </div>
            )}
          </div>

          {!isUpdate && (
            <div>
              <button type="submit" class="btn btn-dark" onClick={handleDelete}>
                Delete
              </button>
              <button type="submit" class="btn btn-dark" onClick={handleSubmit}>
                Add Product
              </button>
            </div>
          )}
          {isUpdate && (
            <button type="submit" class="btn btn-dark" onClick={handleSubmit}>
              Update Product
            </button>
          )}
        </div>
      )}
    </>
  );
}
