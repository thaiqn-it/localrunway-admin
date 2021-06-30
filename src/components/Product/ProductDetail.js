import React, { useEffect, useState, useContext } from "react";
import classes from "./ProductDetail.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import Select from "react-select";
import { categoryApis } from "../../apis/category";
import AppContext from "../store/app-context";
import { useHistory } from "react-router-dom";
import TagInput from "../UI/TagInput";
import {
  PRODUCT_TYPE,
  STATUS_TYPE,
} from "../../constants/control-default-value";

const ProductDetail = (props) => {
  const appCtx = useContext(AppContext);
  const productType = PRODUCT_TYPE;
  const statusType = STATUS_TYPE;

  const [productId, setProductId] = useState(props.id);
  const [hashtags, setHashtags] = useState();
  const [existingProduct, setExistingProduct] = useState();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productHashtags, setProductHashtags] = useState([]);
  const [media, setMedia] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesType, setCategoriesType] = useState([]);

  const [tagInput, setTagInput] = useState("");

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
    console.log(productHashtags);
  };

  const mediaFileInputHandler = (event) => {
    console.log(event.target.files);
  };

  const deleteHashtagHandler = (id) => {
    const tmp = [...productHashtags];
    const index = tmp.findIndex((tag) => tag.id === id);
    tmp.splice(index, 1);
    setProductHashtags(tmp);
  };

  const addHashtagHandler = (event) => {
    console.log(event.key);
    console.log(tagInput);
    if (
      event.key === "Enter" ||
      event.key === "Space" ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      const tmp = [...productHashtags];
      tmp.push({ id: Math.random(), name: tagInput });
      setProductHashtags(tmp);
      setTagInput("");
    }
  };

  const getExistingProduct = async (id) => {
    try {
      const res = await productApis.getProductById(id);
      console.log(res.data);
      if (res.status === API_SUCCSES) {
        setExistingProduct(res.data.product);
        setName(res.data.product.name);
        setType(res.data.product.type);
        setStatus(res.data.product.status);
        setDescription(res.data.product.description);
        setCategoryId(res.data.product.categoryId);
        transformProductHashtags(res.data.product.hashtags);
        console.log(res.data.product.hashtags);
        setMedia(res.data.product.media);
      }
    } catch (err) {
      //later
    }
  };

  const getCategory = async () => {
    try {
      const res = await categoryApis.getAllCategories();
      if (res.status === API_SUCCSES) {
        setCategories(res.data.categories);
        const categories = res.data.categories;
        console.log("CHECK CATE");
        console.log(categories);
        transformCategories(categories);
      }
    } catch (err) {
      //later
    }
  };

  useEffect(() => {
    async function initData() {
      await getExistingProduct(productId);
      await getCategory(productId);
    }
    initData();
  }, [productId]);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const id = existingProduct._id;
    // const product = {
    //   name: name,
    //   color: color,
    //   size: size,
    //   price: price,
    //   quantity: quantity,
    //   status: status,
    //   type: type,
    //   thumbnailUrl:
    //     "https://firebasestorage.googleapis.com/v0/b/image-e6757.appspot.com/o/Local-brand-streetwear-9-2-768x768.jpg?alt=media&token=8fb42b2b-c5b0-4987-b791-ee77352db1f5",
    //   media: [
    //     "https://firebasestorage.googleapis.com/v0/b/image-e6757.appspot.com/o/Local-brand-streetwear-9-2-768x768.jpg?alt=media&token=8fb42b2b-c5b0-4987-b791-ee77352db1f5",
    //   ],
    //   description: description,
    //   brandId: appCtx.localbrand._id,
    //   categoryId: categoryId,
    // };
    // // console.log(product);
    // try {
    //   const res = await productApis.updateProductById(id, product);
    //   console.log(res.data);
    // } catch (error) {
    //   console.log("ERROR", error.message);
    // }
  };

  return (
    <div className={classes.container}>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="inputType">Product Type</label>
            <Select
              options={productType}
              value={productType.find((obj) => obj.value === type)}
              required
              onChange={(productType) => setType(productType)}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputState">Product Status</label>
            <Select
              options={statusType}
              value={statusType.find((obj) => obj.value === status)}
              required
              onChange={(status) => setStatus(status.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="textareaDes">Description</label>
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            className="form-control"
            id="textareaDes"
          ></textarea>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputCategory">Category</label>
            <Select
              options={categoriesType}
              value={categoriesType.find((obj) => obj.value === categoryId)}
              required
              onChange={(cate) => setCategoryId(cate.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputCategory">Hashtags</label>
          <div className="form-group">
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
            <div className="col-md-6">
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
        </div>
        <div className="form-group">
          <label htmlFor="formThumbnail">Media</label>
          <div className="form-row">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                multiple={true}
                onChange={mediaFileInputHandler}
              />
            </div>
          </div>
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
