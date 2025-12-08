import React from "react";

const SearchButton = () => {
  return (
    <button
      className="button is-primary"
      onClick={() => console.log("hello world")}
    >
      Search
    </button>
  );
};

export default SearchButton;
