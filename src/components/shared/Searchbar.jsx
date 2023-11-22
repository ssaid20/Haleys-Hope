import React from "react";
import { Input } from "../ui/input";
const Searchbar = ({ query, setQuery, iconPosition, imgSrc, placeholder, otherClasses }) => {
  function handleOnSearch(value) {
    setQuery(value);
  }

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <img src={imgSrc} alt="search icon" width={24} height={24} className="cursor-pointer" />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleOnSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <img src={imgSrc} alt="search icon" width={24} height={24} className="cursor-pointer" />
      )}
    </div>
  );
};

export default Searchbar;
