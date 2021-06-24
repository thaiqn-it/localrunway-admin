import { event } from "jquery";
import React, { useContext, useState, useEffect } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";
import TagInput from "../UI/TagInput";
import classes from "./CreateProduct.module.css";
import NewProductDetail from "./NewProductDetail";

export default function CreateProduct(props) {
  const appContx = useContext(AppContext);
  const submitError = {
    productName: null,
    description: null,
    price: null,
    categoryId: null,
  };

  const [brandId, setbrandId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [color, setColor] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [productList, setProductList] = useState([]);

  const [error, setError] = useState(submitError);

  const [generalProduct, setGeneralProduct] = useState(true);
  const [detailProduct, setDetailProduct] = useState(true);

  const productNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const handleDetail = (productDetail) => {
    // productList[productDetail.index] = {
    //   ...productDetail,
    // };
    console.log(productDetail);
  };

  const colorDeleteHandle = (i) => {
    color.slice(i, 1);
  };
  const colorAddHandle = (tag) => {};
  useEffect(() => {
    color.map((item, index) => {});
  }, [color]);

  const getCategoryList = async () => {
    try {
      const res = await categoryApis.getCategoryList();
      if (res.status === API_SUCCSES) {
        const categoryList = res.data.categories;
        setCategoryList(categoryList);
      }
    } catch (err) {
      //error handle later
    }
  };

  const handleSubmit = async () => {
    setError(submitError);
    if (brandId != null) {
      try {
        const res = await productApis.postRootProduct(
          productName,
          description,
          categoryId,
          brandId
        );

        if (res.status === API_SUCCSES) {
          //handle succses later
        }
      } catch (err) {
        if (err.response.status === 400) {
          const errorParams = err.response.data.errorParams;

          setError({
            productName: errorParams.name,
            description: errorParams.description,
            price: errorParams.price,
            categoryId: errorParams.categoryId,
          });
        }
      }
    }
  };

  useEffect(() => {
    let brandId = appContx.localbrand === null ? "" : appContx.localbrand._id;
    getCategoryList();
    setbrandId(brandId);
  }, []);

  const CreateGeneralProduct = () => {
    return (
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
            placeholder=""
          />
          {error.productName != null ? (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.productName}
            </div>
          ) : (
            ""
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
            onChange={descriptionChangeHandler}
            placeholder=""
          />
          {error.description != null ? (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.description}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label for="category">Category</label>

          <select
            class="form-control form-control-lg"
            aria-label=".form-select-lg example"
          >
            <option selected>Choose a category</option>
            {categoryList.map((item) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
          {error.categoryId != null ? (
            <div id="validationServer03Feedback" class="invalid-feedback">
              Please provide a Category
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label for="description">Hash Tag</label>
          <TagInput />
          {error.price === null ? (
            ""
          ) : (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.price}
            </div>
          )}
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  };

  const ProductDetailTable = () => {
    return (
      <>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Color</th>
              <th scope="col">Size</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {color.map((item, index) => {
              return (
                <NewProductDetail
                  item={item}
                  index={index}
                  handleDetail={handleDetail}
                />
              );
            })}
          </tbody>
        </table>
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
            <TagInput
              tags={color}
              deleteTag={colorDeleteHandle}
              addTag={colorAddHandle}
            />
            {error.productName != null ? (
              <div id="validationServer03Feedback" class="invalid-feedback">
                {error.productName}
              </div>
            ) : (
              ""
            )}
          </div>
          {color.length > 0 && <ProductDetailTable />}

          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      {generalProduct && <CreateGeneralProduct />}
      {detailProduct && <CreateDetailProdct />}
    </>
  );
}
