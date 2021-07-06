import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/jquery/dist/jquery.min.js";

const TagInput = (props) => {
  const [tags, setTags] = useState([]);

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
    console.log(tag);
    setTags([...tags, { id: tag.id, text: tag.text }]);
    console.log(tags);
  };

  const handleDelete = (i) => {
    const updatedTags = [...tags];
    updatedTags.splice(i, 1);
    setTags(updatedTags);
    console.log(tags);
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
