import SearchBar from "../../atoms/SearchBar/SearchBar";
import SearchButton from "../../atoms/SearchButton/SearchButton";

import React from "react";
import { useState } from "react";

type searchParams = {
  q: String;
  per_page?: number;
  page?: number;
};

interface SearchFormProps {
  // A function that accepts an array of repository items (data) and returns void
  onSearchSuccess: (data: any[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchSuccess }) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // The function automatically knows 'newQuery' is a string thanks to the SearchBarProps interface
  const handleSearchBarChange = (newQuery: string) => {
    // console.log("Query received from SearchBar:", newQuery);
    setCurrentSearchQuery(newQuery);
  };

  const handleSearch = async (search: searchParams) => {
    try {
      const response = await fetch("/api/search/repos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: search.q,
          per_page: search.per_page,
          page: search.page,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onSearchSuccess(data);
      // console.log("Search Results:", data);
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
          handleSearch({ q: currentSearchQuery, per_page: 20, page: 1 }); // Need to handle this better
        }}
      >
        <SearchBar onQueryChange={handleSearchBarChange} />
        <SearchButton />
      </form>
    </>
  );
};

export default SearchForm;
