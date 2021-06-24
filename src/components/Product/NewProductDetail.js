import React, { useState } from "react";

export default function NewProductDetail({ item, index, handleDetail }) {
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const error = false;

  const sizeChangeHandle = (event) => {
    setSize(event.target.value);
  };

  const priceChangeHandle = (event) => {
    setPrice(event.target.value);
  };

  const quantityChangeHandle = (event) => {
    setQuantity(event.target.value);
  };

  const thumbnailChangeHandle = (event) => {
    setThumbnail(event.target.value);
  };
  const handleSubmit = (event) => {
    const productDetail = {
      size,
      quantity,
      price,
      thumbnail,
    };
    handleDetail(productDetail);
  };

  return (
    <tr key={index}>
      <td>{item.text}</td>
      <td>
        <input
          type="text"
          className={
            error.description != null
              ? "form-control is-invalid"
              : "form-control"
          }
          id="size"
          onChange={sizeChangeHandle}
          placeholder=""
        />
      </td>
      <td>
        <input
          type="text"
          className={
            error.price != null ? "form-control is-invalid" : "form-control"
          }
          id="quantity"
          onChange={quantityChangeHandle}
          placeholder=""
        />
      </td>
      <td>
        <input
          type="text"
          className={
            error.price != null ? "form-control is-invalid" : "form-control"
          }
          id="price"
          onChange={priceChangeHandle}
          placeholder=""
        />
      </td>
      <td>
        <input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={thumbnailChangeHandle}
        />
      </td>
      <td>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </td>
    </tr>
  );
}
