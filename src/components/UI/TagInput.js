import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";
import classes from "./TagInput.module.css";

const TagInput = (props) => {
  console.log(props.productHashtags);
  const [tags, setTags] = useState([]);
  //   console.log(tags);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

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
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    const updatedTags = [...tags];
    updatedTags.splice(i, 1);
    setTags(updatedTags);
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
