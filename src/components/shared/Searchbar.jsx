import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";

const Searchbar = ({ iconPosition, imgSrc, placeholder, otherClasses }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((store) => store.studentReducer.list);
  const [query, setQuery] = useState(" ");
  const fuse = new Fuse(students, {
    keys: ["id", "first_name", "last_name",],
    includeScore: true,
    threshold: 0.3, // Adjust this threshold (0.0 to 1.0) for strictness
    minMatchCharLength: 2, // Adjust the minimum character length for a match
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);

  function handleOnSearch(value) {
    console.log(value); // Add this line for debugging
    setQuery(value);
  }

  function clearInput() {
    setQuery(" ");
  }

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <img
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleOnSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <img
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Searchbar;
