import React, { useEffect, useState, useContext } from "react";
import classes from "./ProductDetail.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import Select from "react-select";
import { categoryApis } from "../../apis/category";
import {
  PRODUCT_TYPE,
  STATUS_TYPE,
} from "../../constants/control-default-value";
import ProductDetailItem from "./ProductDetailItem";
import { hashtagApis } from "../../apis/hashtag";
import { mediaApi } from "../../apis/media";
import ErrorFormInput from "../UI/ErrorFormInput";

const ProductDetail = (props) => {
  const productType = PRODUCT_TYPE;
  const statusType = STATUS_TYPE;

  const [productId, setProductId] = useState(props.id);
  const [generalProduct, setExistingProduct] = useState();
  const [childrenProducts, setChildrenProducts] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productHashtags, setProductHashtags] = useState([]);
  const [media, setMedia] = useState([]);
  const [mediaUrl, setMediaUrl] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesType, setCategoriesType] = useState([]);

  const [tagInput, setTagInput] = useState("");

  const [serverErros, setServerErrors] = useState();
  const [nameError, setNameError] = useState();
  const [desError, setDesError] = useState();
  const [mediaError, setMediaError] = useState();
  const [statusError, setStatusError] = useState();
  const [productTypeErros, setProductTypeErrors] = useState();
  const [childrenErrors, setChildrenErrors] = useState("");

  const transformCategories = (categories) => {
    let catesType = [];
    categories.map((cate) => {
      const { name, _id } = cate;
      catesType.push({ label: name, value: _id });
    });
    setCategoriesType(catesType);
  };

  const transformProductHashtags = (rawData) => {
    let hashtags = [];
    rawData.map((item) => {
      const { _id, name } = item;
      hashtags.push({ id: _id, name: name });
    });
    setProductHashtags(hashtags);
  };

  const mediaFileInputHandler = async (event) => {
    setMediaError();
    setMedia(event.target.files);
    const files = event.target.files;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await mediaApi.uploadFie(formData);
        const { publicUrl } = res.data;
        const tmp = [...mediaUrl];
        tmp.push({ mediaUrl: publicUrl });
        setMediaUrl(tmp);
      } catch (err) {}
    }
  };

  const deleteHashtagHandler = async (id) => {
    try {
      //delete productHashtag
      const generalProductId = generalProduct._id;
      const res = await productApis.deleteProductHashtag(generalProductId, id);

      // updateUI;
      const tmp = [...productHashtags];
      const index = tmp.findIndex((tag) => tag.id === id);
      tmp.splice(index, 1);
      setProductHashtags(tmp);
    } catch (err) {
      console.log(err.response.data.errorParams);
    }
  };

  const addHashtagHandler = async (event) => {
    if (
      event.key === "Enter" ||
      event.key === "Space" ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      const tmp = [...productHashtags];
      try {
        //add new hashtag
        const resHashtag = await hashtagApis.addHashtag(tagInput);
        //add new hashtag into product
        const { _id } = resHashtag.data.hashtag;
        const generalProductId = generalProduct._id;

        const resProductHashtag = await productApis.addProductHashtag(
          generalProductId,
          _id
        );

        //reset UI
        tmp.push({ id: _id, name: tagInput });
        setProductHashtags(tmp);
        setTagInput("");
      } catch (err) {}
    }
  };

  const getExistingGeneralProduct = async (id) => {
    try {
      const res = await productApis.getProductById(id);
      if (res.status === API_SUCCSES) {
        setExistingProduct(res.data.product);
        setName(res.data.product.name);
        setType(res.data.product.type);
        setStatus(res.data.product.status);
        setDescription(res.data.product.description);
        setCategoryId(res.data.product.categoryId);
        setMedia(res.data.product.media);
      }
    } catch (err) {
      //redirect?
    }
  };

  const getChildrenProducts = async (id) => {
    try {
      const res = await productApis.getChildrenProducts(id);
      const nonFormatChildrenProductList = res.data.products;
      const formattedProductList = [];
      nonFormatChildrenProductList.map((product) => {
        const {
          _id,
          color,
          size,
          price,
          quantity,
          type,
          thumbnailUrl,
          media,
          brandId,
        } = product;

        formattedProductList.push({
          _id,
          color,
          size,
          price,
          quantity,
          type,
          thumbnailUrl,
          media,
          brandId,
          categoryId: categoryId,
        });
      });
      setChildrenProducts(formattedProductList);
    } catch (err) {}
  };

  const getProductHashtags = async (id) => {
    try {
      const res = await productApis.getProductHashtags(id);
      transformProductHashtags(res.data.hashtags);
    } catch (err) {}
  };

  const getCategory = async () => {
    try {
      const res = await categoryApis.getAllCategories();
      if (res.status === API_SUCCSES) {
        setCategories(res.data.categories);
        const categories = res.data.categories;
        transformCategories(categories);
      }
    } catch (err) {}
  };

  useEffect(() => {
    async function initData() {
      await getExistingGeneralProduct(productId);
      await getCategory(productId);
      await getProductHashtags(productId);
      await getChildrenProducts(productId);
    }
    initData();
  }, [productId]);

  const getDetailProductInput = (productToUpdate) => {
    setChildrenErrors();
    const {
      _id,
      size,
      color,
      quantity,
      price,
      thumbnailUrl,
      name,
      status,
      description,
      categoryId,
    } = productToUpdate;

    const index = childrenProducts.findIndex(
      (product) => product._id === productToUpdate._id
    );

    if (index >= 0) {
      const childrenProduct = childrenProducts[index];

      const updatedchildrenProduct = {
        ...childrenProduct,
        name,
        status,
        description,
        categoryId,
        size,
        color,
        quantity,
        price,
        thumbnailUrl: thumbnailUrl,
      };

      const tmp = [...childrenProducts];
      tmp[index] = updatedchildrenProduct;

      console.log("yyy");
      console.log(updatedchildrenProduct);
      setChildrenProducts(tmp);
      console.log("xxx");
      console.log(childrenProducts);
    }
  };

  const updateChildrenProduct = (updatedGeneralProduct) => {
    const updatedChildren = [];
    const tmpChildren = [...childrenProducts];
    tmpChildren.map((prod) => {
      const product = {
        ...prod,
        name: updatedGeneralProduct.name,
        status: updatedGeneralProduct.status,
        description: updatedGeneralProduct.description,
        categoryId: updatedGeneralProduct.categoryId,
        media: updatedGeneralProduct.media,
      };
      updatedChildren.push(product);
    });
    setChildrenProducts(updatedChildren);
    return updatedChildren;
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();

    //update newest state for GP
    const id = generalProduct._id;
    const updatedGeneralProduct = {
      _id: id,
      name: name,
      color: generalProduct.color,
      size: generalProduct.size,
      price: generalProduct.price,
      quantity: generalProduct.quantity,
      status: status,
      type: type,
      thumbnailUrl: generalProduct.thumbnailUrl,
      media: mediaUrl,
      description: description,
      brandId: generalProduct.brandId,
      categoryId: categoryId,
      hashtags: productHashtags,
      categoryId: categoryId,
    };

    //update children to newsest state
    const updatedChildren = updateChildrenProduct(updatedGeneralProduct);

    //call API
    const productsToUpdate = [updatedGeneralProduct, ...updatedChildren];
    try {
      for (let product of productsToUpdate) {
        const res = await productApis.updateProductById(product._id, product);
        console.log(res.data);
      }
    } catch (error) {
      const {
        brandId,
        color,
        description,
        media,
        name,
        price,
        quantity,
        size,
        status,
        thumbnailUrl,
        type,
      } = error.response.data.errorParams;
      // console.log(error.response.data.errorParams);
      if (brandId) {
        setServerErrors(brandId);
      }
      if (color) {
        let childMsg = childrenErrors;
        childMsg += "color: " + color + "\n";
        setChildrenErrors(childMsg);
      }
      if (description) {
        setDesError(description);
      }
      if (media) {
        setMediaError(media);
      }
      if (name) {
        let childMsg = childrenErrors;
        childMsg += "name: " + name + "\n";
        setChildrenErrors(childMsg);
      }
      if (price) {
        let childMsg = childrenErrors;
        childMsg += "price: " + price + "\n";
        setChildrenErrors(childMsg);
      }
      if (quantity) {
        let childMsg = childrenErrors;
        childMsg += "quantity: " + quantity + "\n";
        setChildrenErrors(childMsg);
      }
      if (size) {
        let childMsg = childrenErrors;
        childMsg += "size: " + size + "\n";
        setChildrenErrors(childMsg);
      }
      if (status) {
        setStatusError(status);
      }
      if (thumbnailUrl) {
        let childMsg = childrenErrors;
        childMsg += "thumbnail: " + thumbnailUrl + "\n";
        setChildrenErrors(childMsg);
      }
      if (type) {
        setProductTypeErrors(type);
      }
    }
  };

  return (
    <div className={classes.container}>
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product name"
              value={name}
              onChange={(event) => {
                setNameError();
                setName(event.target.value);
              }}
            />
            {nameError && <ErrorFormInput errorMsg={nameError} />}
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="inputType">Product Type</label>
            <Select
              options={productType}
              value={productType.find((obj) => obj.value === type)}
              required
              onChange={(productType) => {
                setProductTypeErrors();
                setType(productType);
              }}
            />
            {productTypeErros && <ErrorFormInput errorMsg={productTypeErros} />}
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Product Status</label>
            <Select
              options={statusType}
              value={statusType.find((obj) => obj.value === status)}
              required
              onChange={(status) => {
                setStatusError();
                setStatus(status.value);
              }}
            />
            {statusError && <ErrorFormInput errorMsg={statusError} />}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="textareaDes">Description</label>
            <textarea
              onChange={(event) => {
                setDesError();
                setDescription(event.target.value);
              }}
              value={description}
              className="form-control"
              id="textareaDes"
            ></textarea>
            {desError && <ErrorFormInput errorMsg={desError} />}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputCategory">Category</label>
            <Select
              options={categoriesType}
              value={categoriesType.find((obj) => obj.value === categoryId)}
              required
              onChange={(cate) => {
                setCategoryId(cate.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputCategory">Hashtags</label>
          <div className={classes.tagList}>
            {productHashtags.map((tag) => (
              <div
                className={classes.taglistItem}
                key={tag.id}
                onClick={() => deleteHashtagHandler(tag.id)}
              >
                #{tag.name}
              </div>
            ))}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Input Hashtags"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => addHashtagHandler(event)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formThumbnail">Product's Media Images</label>
          <div className="form-row">
            {mediaUrl.map((url) => (
              <img
                className={classes.image_slide}
                src={url.mediaUrl}
                alt="media of image"
              />
            ))}
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                multiple={true}
                onChange={mediaFileInputHandler}
              />
              {mediaError && <ErrorFormInput errorMsg={mediaError} />}
            </div>
          </div>
        </div>
        <div className="form-group">
          {childrenProducts.map((product) => (
            <ProductDetailItem
              product={product}
              onChangeInput={getDetailProductInput}
              status={status}
              name={name}
              description={description}
              categoryId={categoryId}
              childrenErrors={childrenErrors}
            />
          ))}
        </div>

        <div className="form-group">
          {childrenErrors && <ErrorFormInput errorMsg={childrenErrors} />}
        </div>

        <div className="form-group">
          <button
            onClick={submitHandler}
            type="button"
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
