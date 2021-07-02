import React, { useEffect, useState, useContext } from "react";
import classes from "./ProductDetail.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import Select from "react-select";
import firebase from "../firebase/firebase";
import { categoryApis } from "../../apis/category";
import {
  PRODUCT_TYPE,
  STATUS_TYPE,
} from "../../constants/control-default-value";
import ProductDetailItem from "./ProductDetailItem";
import { hashtagApis } from "../../apis/hashtag";

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
  const [progress, setProgress] = useState(0);

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

  const mediaFileInputHandler = (event) => {
    setMedia(event.target.files);
  };

  const FirebaseUrlHandler = () => {
    console.log(media);
    const temp = [...mediaUrl];
    const files = [...media];
    for (const file of files) {
      console.log("check ..." + file);
      try {
        let fileToUp = file;
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef
          .child("media/" + fileToUp.name)
          .put(fileToUp);
        console.log("check");
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            //progress check tien do upload file
            //thay bang bien true hay false gi do de check da up dc file cung duoc
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
              temp.push({ mediaUrl: url });
              setMediaUrl(temp);
            });
          }
        );
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const deleteHashtagHandler = async (id) => {
    try {
      //delete productHashtag
      const generalProductId = generalProduct._id;
      console.log(generalProductId);
      console.log(id);
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
        console.log(tmp);
        setProductHashtags(tmp);
        setTagInput("");
      } catch (err) {
        console.log(err.response.data.errorParams);
      }
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
      //later
    }
  };

  const getChildrenProducts = async (id) => {
    try {
      const res = await productApis.getChildrenProducts(id);
      // console.log(res.data);
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
      console.log(res.data);
      transformProductHashtags(res.data.hashtags);
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
        transformCategories(categories);
      }
    } catch (err) {
      //later
    }
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
    const {
      size,
      color,
      quantity,
      price,
      thumbnailsItem,
      name,
      status,
      description,
      categoryId,
    } = productToUpdate;

    const index = childrenProducts.findIndex(
      (product) => product._id === productToUpdate.id
    );

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
      thumbnailUrl: thumbnailsItem,
    };

    const tmp = [...childrenProducts];
    tmp[index] = updatedchildrenProduct;
    setChildrenProducts(tmp);
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();

    const id = generalProduct._id;
    const updatedGeneralProduct = {
      id: id,
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

    console.log(updatedGeneralProduct);

    const tmpChildren = [];
    childrenProducts.map((prod) => {
      const product = {
        ...prod,
        name: updatedGeneralProduct.name,
        status: updatedGeneralProduct.status,
        description: updatedGeneralProduct.description,
        categoryId: updatedGeneralProduct.categoryId,
        media: media,
      };
      tmpChildren.push(product);
    });

    const productToUpdate = [updatedGeneralProduct, ...tmpChildren];
    try {
      let res = await productApis.updateProductById(
        updatedGeneralProduct.id,
        updatedGeneralProduct
      );
      console.log(res.data);
      // productToUpdate.map((product) => {
      //   // let res = await productApis.updateProductById(product.id, product);
      //   console.log(product);
      // });
    } catch (error) {
      console.log(error.response.data.errorParams);
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
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="inputType">Product Type</label>
            <Select
              options={productType}
              value={productType.find((obj) => obj.value === type)}
              required
              onChange={(productType) => setType(productType)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Product Status</label>
            <Select
              options={statusType}
              value={statusType.find((obj) => obj.value === status)}
              required
              onChange={(status) => setStatus(status.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="textareaDes">Description</label>
            <textarea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              className="form-control"
              id="textareaDes"
            ></textarea>
          </div>
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
          <label htmlFor="formThumbnail">Product's Images</label>
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
          <button
            onClick={FirebaseUrlHandler}
            type="button"
            class="btn btn-primary"
          >
            Upload
          </button>
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
            />
          ))}
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
