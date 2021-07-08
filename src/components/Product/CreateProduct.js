import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";

import classes from "./CreateProduct.module.css";
import NewProductDetail from "./NewProductDetail";
import GeneralProduct from "./GeneralProduct";
import CreateProductHashtag from "./CreateProductHashtag";
import { localbrandsApis } from "../../apis/localbrands";
import { useHistory } from "react-router-dom";

export default function CreateProduct(props) {
  const newProductDetail = {
    color: "",
    quantity: "",
    size: "",
    price: "",
    thumbnail: "",
  };
  const history = useHistory();
  const [productDetailList, setProductDetailList] = useState([]);
  const [generalProduct, setGeneralProduct] = useState(null);

  const [showGeneralProductForm, setShowGeneralProductForm] = useState(true);
  const [showDetailProduct, setShowDetailProduct] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleDetailChange = (productDetail, index) => {
    const updatedProductDetailList = [...productDetailList];
    updatedProductDetailList[index] = productDetail;
    setProductDetailList(updatedProductDetailList);
  };

  const handleDetailDelete = async (index) => {
    const productListDelete = [...productDetailList];
    const product = productListDelete[index];
    if (product._id != null) {
      const res = await productApis.deleteProductById(product._id);
      if (res.status === API_SUCCSES) {
      }
    }
    productListDelete.splice(index, 1);
    setProductDetailList(productListDelete);
  };
  const handleAddProductDetail = () => {
    setProductDetailList([...productDetailList, newProductDetail]);
  };

  const handleNewGeneralProductSubmit = (generalProduct) => {
    setGeneralProduct(generalProduct);
    setProductDetailList([newProductDetail]);
    setShowGeneralProductForm(!showGeneralProductForm);
    setShowDetailProduct(!showDetailProduct);
  };
  const checkNotSubmitedProduct = (detailList) => {
    return (
      detailList.filter((productDetail) => productDetail._id == null).length > 0
    );
  };
  const handleCreateProduct = () => {
    const detailList = [...productDetailList];
    if (checkNotSubmitedProduct(detailList)) {
      setSubmitError("There is a detail not submited");
    } else {
      props.onGetProductId(generalProduct._id);
      history.push("/home/productDetail");
    }
  };
  const onInit = async () => {
    const brandResponse = await localbrandsApis.getAuthInfo();
    setBrandId(brandResponse.data._id);
  };

  useEffect(() => {
    onInit();
  }, []);

  const ProductDetailBox = () => {
    return (
      <>
        {productDetailList.map((item, i) => {
          return (
            <NewProductDetail
              productDetail={item}
              index={i}
              handleDetailChange={handleDetailChange}
              handleDetailDelete={handleDetailDelete}
              generalProduct={generalProduct}
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

          {productDetailList.length > 0 && <ProductDetailBox />}
          <button
            type="submit"
            class="btn btn-dark"
            onClick={handleAddProductDetail}
          >
            Add Product Detail
          </button>
          <button
            type="submit"
            class="btn btn-dark"
            onClick={handleCreateProduct}
          >
            Create Product
          </button>
          {submitError != null && (
            <div className="form-row">
              <div id="validation" class="alert alert-danger">
                {submitError}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      {showGeneralProductForm && (
        <GeneralProduct
          update={generalProduct != null}
          handleNewProductSubmit={(generalProduct) =>
            handleNewGeneralProductSubmit(generalProduct)
          }
          brandId={brandId}
        />
      )}

      {showDetailProduct && <CreateDetailProdct />}
    </>
  );
}
