import React, { useState } from "react";

export default function NewProductDetail({
  item,
  index,
  handleDetail,
  handleDetailDelete,
  generalProduct,
}) {
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const error = false;
  const productStatus = { active: "ACTIVE", inactive: "INACTIVE" };
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
      name: generalProduct.name,
      color: generalProduct.color,
      size: size,
      price: price,
      quantity: quantity,
      status: productStatus.active,
      type: "DP",
      description: generalProduct.description,
      thumbnailUrl:
        "https://firebasestorage.googleapis.com/v0/b/image-e6757.appspot.com/o/jacket-ontop-local-brand-viet-nam.2jpg-800x800.jpg?alt=media&token=4f02c71e-1c7a-45d0-abc9-c5885ebb055a",
      media: generalProduct.media,
      brandId: generalProduct.brandId,
      categoryId: generalProduct.categoryId,
    };

    handleDetail(productDetail, index);
  };
  const handleDelete = () => {
    handleDetailDelete(index);
  };

  return (
    <>
      <div className="form-group has-validation">
        <label for="productName">Product Size</label>
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
          defaultValue={`${item.size}`}
        />
      </div>
      <div className="form-group has-validation">
        <label for="productName">Product Quantity</label>
        <input
          type="text"
          className={
            error.price != null ? "form-control is-invalid" : "form-control"
          }
          id="quantity"
          onChange={quantityChangeHandle}
          placeholder=""
          defaultValue={`${item.quantity}`}
        />
      </div>
      <div className="form-group has-validation">
        <label for="productName">Product Price</label>
        <input
          type="text"
          className={
            error.price != null ? "form-control is-invalid" : "form-control"
          }
          id="price"
          onChange={priceChangeHandle}
          placeholder=""
          defaultValue={`${item.price}`}
        />
      </div>
      <div className="form-group has-validation">
        <label for="productName">Product Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={thumbnailChangeHandle}
          defaultValue={item.thumbnail}
        />
      </div>

      <button type="submit" class="btn btn-primary" onClick={handleDelete}>
        Delete
      </button>
      <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
