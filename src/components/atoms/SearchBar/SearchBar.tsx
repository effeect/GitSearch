import React from "react";
import { useState } from "react";
import SearchButton from "../SearchButton/SearchButton";

interface SearchBarProps {
  onQueryChange: (query: string) => void;
}

// Taken from https://bulma.io/documentation/form/input/
const SearchBar = ({ onQueryChange }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onQueryChange(newQuery);
  };

  return (
    <div className="field ">
      <label className="label">Search for Github Repository</label>
      <div className="field has-addons is-justify-content-center">
        <div className="control">
          <input
            className="input is-primary"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <SearchButton isAddon={true}></SearchButton>
      </div>
    </div>
  );
};

export default SearchBar;
