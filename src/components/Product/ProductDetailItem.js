import React, { useEffect, useState } from "react";

const ProductDetailItem = (props) => {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [thumbnail, setThumbnail] = useState();

  const initData = () => {
    const product = props.product;
    setPrice(product.price);
    setSize(product.size);
    setColor(product.color);
    setQuantity(product.quantity);
    setThumbnail(product.thumbnail);
  };

  useEffect(() => {
    initData();
  }, [price, size, color, quantity, thumbnail]);

  const thumbnailFileInputHandler = (event) => {
    console.log(event.target.files);
  };
  //size quantity price thumbnail
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Price"
            value={price}
            onChange={(event) => setPrice(parseInt(event.target.value))}
          ></input>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          ></input>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="colorInput">Color</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
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
            value={quantity}
            onChange={(event) => setQuantity(parseInt(event.target.value))}
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
              onChange={thumbnailFileInputHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailItem;
