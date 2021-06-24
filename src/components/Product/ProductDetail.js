import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";
import "../../../node_modules/react-bootstrap-tagsinput/dist/index.css";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import Select from "react-select";
import { categoryApis } from "../../apis/category";
import TagInput from "../UI/TagInput";

const ProductDetail = (props) => {
  const [hashtags, setHashtags] = useState([]);
  const [existingProduct, setExistingProduct] = useState();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productHashtags, setProductHashtags] = useState([]);
  //eslint-disable-next-line
  const [media, setMedia] = useState([]);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoriesType, setCategoriesType] = useState([]);

  const productType = [
    { value: "GP", label: "GP" },
    { value: "DP", label: "DP" },
  ];

  const statusType = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  const hashtagsInput = (hashtag) => {
    setHashtags(hashtag);
    console.log(hashtags);
  };

  const transformCategories = (categories) => {
    // console.log("FROM TRANSFORM");
    let catesType = [];
    categories.map((cate) => {
      const { name, _id } = cate;
      catesType.push({ label: name, value: _id });
    });
    // console.log(catesType);
    setCategoriesType(catesType);
  };

  const fileInputHandler = (event) => {
    console.log(event.target.files);
  };

  const getExistingProduct = async (id) => {
    const res = await productApis.getProductById(id);
    if (res.status === API_SUCCSES) {
      setExistingProduct(res.data.product);
      // console.log(res.data.product);
      setName(res.data.product.name);
      setType(res.data.product.type);
      setStatus(res.data.product.status);
      setDescription(res.data.product.description);
      setCategoryId(res.data.product.categoryId);
      setProductHashtags([...productHashtags, res.data.product.hashtags]);
      setMedia(res.data.product.media);
      setPrice(res.data.product.price);
      setSize(res.data.product.size);
      setColor(res.data.product.color);
      setQuantity(res.data.product.quantity);
      setThumbnail(res.data.product.thumbnailUrl);
    }
  };

  const getCategory = async () => {
    try {
      const res = await categoryApis.getAllCategories();
      if (res.status === API_SUCCSES) {
        setCategories(res.data.categories);
        const categories = res.data.categories;
        transformCategories(categories);
      }
    } catch (err) {
      //later
    }
  };

  useEffect(() => {
    getExistingProduct(props.id);
    getCategory(props.id);
  }, []);

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
              onChange={() => {}}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputState">Product Status</label>
            <Select
              options={statusType}
              value={statusType.find((obj) => obj.value === status)}
              required
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="textareaDes">Description</label>
          <textarea
            onChange={() => {}}
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
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputCategory">Hashtags</label>
          <div className="form-group">
            <TagInput productHashtags={productHashtags} />
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
                onChange={fileInputHandler}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Product Price"
            ></input>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="size">Size</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Size"
            ></input>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="colorInput">Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Color"
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="formQuantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Product Quantity"
            ></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="formThumbnail">Thumbnail</label>
          <div className="form-row">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                multiple={true}
                onChange={fileInputHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
