import React from "react";
import { useState } from "react";

interface SearchBarProps {
  onQueryChange: (query: string) => void;
}

// Taken from https://bulma.io/documentation/form/input/
const SearchBar = ({ onQueryChange }: SearchBarProps) => {
  // Handling the search query from the inside of the search bar

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onQueryChange(newQuery);
  };

  return (
    <div className="field">
      <label className="label">Search for Github Repository</label>
      <div className="control">
        <input
          className="input is-primary"
          type="text"
          placeholder="Primary input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
