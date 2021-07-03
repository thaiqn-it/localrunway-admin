import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";

import classes from "./CreateProduct.module.css";
import NewProductDetail from "./NewProductDetail";
import NewGeneralProduct from "./NewGeneralProduct";
import CreateProductHashtag from "./CreateProductHashtag";

export default function CreateProduct(props) {
  const newProductDetail = {
    color: "",
    quantity: "",
    size: "",
    price: "",
    thumbnail: "",
  };
  const [productDetailList, setProductDetailList] = useState([]);
  const handleDetail = (productDetail, index) => {
    const updatedProductDetailList = [...productDetailList];
    updatedProductDetailList[index] = { productDetail };
    setProductDetailList(updatedProductDetailList);
  };
  const handleDetailDelete = (index) => {
    const productListDelete = [...productDetailList];

    productListDelete.splice(index, 1);
    setProductDetailList(productListDelete);
  };
  const handleAddProductDetail = () => {
    setProductDetailList([...productDetailList, newProductDetail]);
  };
  const submitError = {
    productName: null,
    description: null,
    price: null,
    categoryId: null,
  };
  const [generalProduct, setGeneralProduct] = useState(null);
  const [error, setError] = useState(submitError);
  const [showGeneralProductForm, setShowGeneralProductForm] = useState(true);
  const [showDetailProduct, setShowDetailProduct] = useState(true);
  const ProductDetailBox = () => {
    return (
      <>
        {productDetailList.map((item, i) => {
          return (
            <NewProductDetail
              item={item}
              index={i}
              handleDetail={handleDetail}
              handleDetailDelete={handleDetailDelete}
            />
          );
        })}
      </>
    );
  };

  const CreateDetailProdct = () => {
    return (
      <>
        <div className={classes.container}>
          <h1>Product Details</h1>
          <div className="form-group has-validation">
            <label for="productName">Color</label>

            {error.productName != null ? (
              <div id="validationServer03Feedback" class="invalid-feedback">
                {error.productName}
              </div>
            ) : (
              ""
            )}
          </div>
          {productDetailList.length > 0 && <ProductDetailBox />}
          <button
            type="submit"
            class="btn btn-primary"
            onClick={handleAddProductDetail}
          >
            Add Product Detail
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={console.log("submit")}
          >
            Submit
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      {showGeneralProductForm && (
        <NewGeneralProduct setGeneralProduct={setGeneralProduct} />
      )}
      {generalProduct == null && <CreateProductHashtag />}
      {showDetailProduct && <CreateDetailProdct />}
    </>
  );
}
