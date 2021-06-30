import React, { useEffect, useState } from "react";

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
  const [thumbnails, setThumbnails] = useState([]);
  const [productId, setProductId] = useState("");

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
    setThumbnails(product.thumbnails);
    setProductId(product._id);
  };

  useEffect(() => {
    initData();
  }, []);

  const getProduct = () => {
    const product = {
      id: productId,
      name,
      type,
      status,
      description,
      categoryId,
      size,
      color,
      quantity,
      price,
      thumbnails,
    };
    return product;
  };

  useEffect(() => {
    const product = getProduct();
    props.onChangeInput(product);
  }, [size, color, quantity, price, thumbnails]);

  return (
    <>
      <div className="form-row">
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
            onChange={(event) => setColor(event.target.value)}
          ></input>
        </div>
        <div className="form-group col-md-1">
          <label htmlFor="formQuantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          ></input>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="formThumbnail">
          Thumbnail For Size: {size} And Color: {color}
        </label>
        <div className="form-row">
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              multiple={true}
              onChange={(event) => setThumbnails(event.target.files)}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProductDetailItem;
