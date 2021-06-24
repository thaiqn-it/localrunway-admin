import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";

const TagInput = ({ tags, deleteTagHandle, addTagHandle }, props) => {
  // console.log(props.productHashtags);

  //   console.log(tags);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const transformProductHashtags = () => {
    props.productHashtags.map((obj) => {
      const { _id, name } = obj[0];
      console.log(obj[0]);
      setTags([...tags, { id: _id, text: name }]);
    });
  };

  useEffect(() => {
    console.log("first");
    transformProductHashtags();
    console.log("second");
  }, [props.productHashtags]);

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  //eslint-disable-next-line
  const [suggestions, setSuggestions] = useState([
    { id: "USA", text: "USA" },
    { id: "Germany", text: "Germany" },
    { id: "Austria", text: "Austria" },
    { id: "Costa Rica", text: "Costa Rica" },
    { id: "Sri Lanka", text: "Sri Lanka" },
    { id: "Thailand", text: "Thailand" },
  ]);

  const handleAddition = (tag) => {
    deleteTagHandle(tag);
  };

  const handleDelete = (i) => {
    addTagHandle(i);
  };

  return (
    <ReactTags
      inline
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleAddition={handleAddition}
      handleDelete={handleDelete}
    />
  );
};

export default TagInput;
