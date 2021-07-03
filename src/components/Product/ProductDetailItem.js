import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

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
  const [thumbnailItem, setThumbnailItem] = useState();
  const [thumbnailsItemUrl, setThumbnailsItemUrl] = useState("");
  const [productId, setProductId] = useState("");
  const [progress, setProgress] = useState(0);

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
      thumbnailUrl: thumbnailsItemUrl,
    };
    console.log(product);
    return product;
  };
  const FirebaseUrlHandler = () => {
    let fileToUp = thumbnailItem;
    console.log("check", fileToUp);
    try {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadTask = storageRef
        .child("media/" + fileToUp.name)
        .put(fileToUp);
      console.log("check");
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          throw error;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            setThumbnailsItemUrl(url);
            setThumbnailItem(url);
          });
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const product = getProduct();
    props.onChangeInput(product);
  }, [size, color, quantity, price, thumbnailsItemUrl]);

  return (
    <>
      <hr />
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
        <div className="form-row">
          <img
            src={thumbnailItem}
            alt="Girl in a jacket"
            width="100"
            height="100"
          />
        </div>

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
              onChange={(event) => setThumbnailItem(event.target.files[0])}
            />
          </div>
          <button
            onClick={FirebaseUrlHandler}
            type="button"
            className="btn btn-primary"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailItem;
