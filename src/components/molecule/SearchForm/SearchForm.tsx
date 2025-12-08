import SearchBar from "../../atoms/SearchBar/SearchBar";
import SearchButton from "../../atoms/SearchButton/SearchButton";

import React from "react";
import { useState } from "react";

const SearchForm = () => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // The function automatically knows 'newQuery' is a string thanks to the SearchBarProps interface
  const handleSearchBarChange = (newQuery: string) => {
    // console.log("Query received from SearchBar:", newQuery);
    setCurrentSearchQuery(newQuery);
  };

  const handleSearch = async (searchParams: any) => {
    try {
      const response = await fetch("/api/search/repos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: searchParams }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Do something with the list of repositories (data is an array of items)
      console.log("Search Results:", data);
    } catch (error) {
      console.error("Failed to search repositories", error);
    }
  };

  return (
    <>
      <form
        className="box"
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the page from doing default form stuff
          handleSearch(currentSearchQuery);
        }}
      >
        <SearchBar onQueryChange={handleSearchBarChange} />
        <SearchButton />
      </form>
    </>
  );
};

export default SearchForm;
