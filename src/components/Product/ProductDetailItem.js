import React, { useEffect, useState } from "react";
import { mediaApi } from "../../apis/media";
import ErrorFormInput from "../UI/ErrorFormInput";
import classes from "./ProductDetailItem.module.css";

const ProductDetailItem = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [thumbnailItem, setThumbnailItem] = useState("");
  const [productId, setProductId] = useState("");

  const [thumbnailError, setThumbnailError] = useState();

  const initData = () => {
    const product = props.product;
    setName(props.name);
    setType("DP");
    setStatus(props.status);
    setDescription(props.description);
    setCategoryId(props.categoryId);
    setPrice(product.price);
    setSize(product.size);
    setColor(product.color);
    setQuantity(product.quantity);
    setThumbnailItem(product.thumbnailUrl);
    setProductId(product._id);
  };

  useEffect(() => {
    initData();
  }, []);

  const getProduct = () => {
    const product = {
      _id: productId,
      name,
      type,
      status,
      description,
      categoryId,
      size,
      color,
      quantity,
      price,
      thumbnailUrl: thumbnailItem,
    };
    return product;
  };

  useEffect(() => {
    const product = getProduct();
    props.onChangeInput(product);
  }, [size, color, quantity, price, thumbnailItem]);

  const thumbnailInputHandler = async (file) => {
    setThumbnailError();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await mediaApi.uploadFie(formData);
      const { publicUrl } = res.data;
      setThumbnailItem(publicUrl);
    } catch (err) {
      const msg = err.response.data.errorParams;
      const serverMsg = msg;
      setThumbnailError(serverMsg);
    }
  };

  return (
    <>
      <hr />
      <div className="form-group">
        <img
          className={classes.image}
          src={thumbnailItem}
          alt="thumbnail for this child product"
          width="100"
          height="100"
        />
      </div>
      <div className="form-row" key={productId}>
        <div className="form-group col-md-1">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Size"
            defaultValue={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-group col-md-1">
          <label htmlFor="colorInput">Color</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-group col-md-1">
          <label htmlFor="formQuantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row">
          <label htmlFor="formThumbnail">
            Thumbnail For Size: {size} And Color: {color}
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                thumbnailInputHandler(event.target.files[0]);
              }}
            />
          </div>
          {thumbnailError && <ErrorFormInput errorMsg={thumbnailError} />}
        </div>
      </div>
    </>
  );
};

export default ProductDetailItem;
