import { WithContext as ReactTags } from "react-tag-input";
import React, { useContext, useState, useEffect, useRef } from "react";
import { categoryApis } from "../../apis/category";
import { productApis } from "../../apis/product";
import { API_BAD_REQUEST, API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";

import classes from "./CreateProductHashtag.module.css";
import { hashtagApis } from "../../apis/hashtag";
import { productHashtagApi } from "../../apis/productHastag";

export default function CreateProductHashtag({
  productId,
  prodcutHashtags,
  updateMode,
  handleHashtagsListChange,
  handleServerError,
}) {
  const submitError = {
    productName: null,
    description: null,
    price: null,
    categoryId: null,
    hashtags: null,
  };

  const [hashtagSuggetionList, setHashtagSuggetionList] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showSuggetion, setShowSuggetion] = useState(false);

  const [error, setError] = useState(submitError);

  const onInit = () => {
    if (updateMode === true) {
      setHashtags(prodcutHashtags);
    }
  };

  const suggetionWrapperRef = useRef(null);
  const checkHashtagSelected = (hashtag) => {
    const tmp = [...hashtags];
    return tmp.map((hashtag) => (hashtag = hashtag._id)).includes(hashtag._id);
  };
  const getHashtagSuggetionlist = async () => {
    try {
      const res = await hashtagApis.getAllHashtags();
      if (res.status === API_SUCCSES) {
        const hashtaglist = res.data.hashtags;
        hashtaglist.map((item, index) => (item.index = index));
        setHashtagSuggetionList(hashtaglist);
      }
    } catch (err) {
      handleServerError(err.response.data.error);
    }
  };
  const checkInputHashtagInSuggetionList = (hashtagName) => {
    let result = -1;
    const tmp = [...hashtagSuggetionList];
    tmp.forEach((hashtag, index) => {
      if (hashtag.name == hashtagName) {
        result = index;
      }
    });
    return result;
  };
  const handleHashTagSuggetionClick = async (index) => {
    const tmp = [...hashtags];
    let selectedHashtag = hashtagSuggetionList[index];
    if (updateMode === true) {
      const productHashtagId = await createProductHashtag(selectedHashtag);
      selectedHashtag = { ...selectedHashtag, productHashtagId };
    }

    tmp.push(selectedHashtag);
    console.log(`add element at ${index}`);
    setHashtags(tmp);
    setTagInput("");
  };
  const createProductHashtag = async (hashtagId) => {
    try {
      const res = await productHashtagApi.createProductHastag(
        hashtagId,
        productId
      );
      if (res.status === API_SUCCSES) {
        return res.data.productHashtag._id;
      }
    } catch (err) {
      handleServerError(err.response.data.error);
    }
  };
  const deleteProductHashTag = async (hashtagId) => {
    try {
      const res = await productHashtagApi.deleteProductHashtag(
        hashtagId,
        productId
      );
      if (res === API_SUCCSES) {
        return res.data.productHashtag._id;
      }
    } catch (err) {
      handleServerError(err.response.data.error);
    }
  };

  const createHashtag = async (hashtagName) => {
    try {
      const res = await hashtagApis.postHashtag(hashtagName);
      if (res.status === API_SUCCSES) {
        return res.data.hashtag;
      }
    } catch (err) {
      handleServerError(err.response.data.error);
    }
  };
  const handleHashTagSuggetionClickOutSide = (event) => {
    const { current: wrap } = suggetionWrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setShowSuggetion(false);
    }
  };

  const deleteHashtagHandler = async (i) => {
    console.log(i);
    const tmp = [...hashtags];
    if (updateMode === true) {
      await deleteProductHashTag(tmp[i]._id);
    }

    tmp.splice(i, 1);
    setHashtags(tmp);
  };

  const addHashtagHandler = async (event) => {
    if (
      event.key === "Enter" ||
      event.key === "Space" ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      const tmp = [...hashtags];
      let newHashtag = await createHashtag(tagInput);
      const indexOfInput = checkInputHashtagInSuggetionList(tagInput);
      console.log(indexOfInput);
      if (indexOfInput != -1) {
        console.log("handle input duplicate");
        handleHashTagSuggetionClick(indexOfInput);
      } else {
        if (updateMode === true) {
          const productHashtagId = await createProductHashtag(newHashtag._id);
          newHashtag = { ...newHashtag, productHashtagId };
          console.log(newHashtag);
          tmp.push(newHashtag);

          setHashtags(tmp);
        }
      }

      setTagInput("");
    }
  };
  useEffect(() => {
    handleHashtagsListChange(hashtags);
  }, [hashtags]);
  useEffect(() => {
    onInit();
    getHashtagSuggetionlist();
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleHashTagSuggetionClickOutSide);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleHashTagSuggetionClickOutSide
      );
    };
  }, []);
  return (
    <>
      <div className="form-group">
        <label htmlFor="inputCategory">Hashtags</label>
        <div className={classes.tagList}>
          {[...hashtags].map((tag, key) => (
            <div
              className={classes.taglistItem}
              key={key}
              onClick={() => deleteHashtagHandler(key)}
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
            onClick={() => setShowSuggetion(true)}
            // onClick={console.log("clicked")}
          />
          {showSuggetion && (
            <div className={classes.hashtagSuggetion} ref={suggetionWrapperRef}>
              {[...hashtagSuggetionList]
                .filter(
                  (hashtag) =>
                    hashtag.name.indexOf(tagInput.toLowerCase()) > -1 &&
                    !checkHashtagSelected(hashtag)
                )

                .slice(0, 5)
                .map((hashtag) => {
                  return (
                    <div
                      className={classes.suggetion}
                      key={hashtag.index}
                      onClick={() => handleHashTagSuggetionClick(hashtag.index)}
                      tabIndex={0}
                    >
                      <span>{hashtag.name}</span>
                    </div>
                  );
                })}
            </div>
          )}
          {error.hashtags === null ? (
            ""
          ) : (
            <div id="validationServer03Feedback" class="invalid-feedback">
              {error.hashtags}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
