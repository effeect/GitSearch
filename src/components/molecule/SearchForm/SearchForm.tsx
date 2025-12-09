import SearchBar from "../../atoms/SearchBar/SearchBar";
import RuleSet from "../RuleSet/RuleSet";
import React, { Children } from "react";
import { useState } from "react";

type searchParams = {
  q: String;
  per_page?: number;
  page?: number;
  sort?: string;
};

interface SearchFormProps {
  // A function that accepts an array of repository items (data) and returns void
  onSearchSuccess: (data: any[], total_count: number) => void;
  setLoading: (isLoading: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearchSuccess,
  setLoading,
  currentPage = 1, // Setting default
  setCurrentPage,
}) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [qualiferQuery, setQualifierQuery] = useState("");
  // const [loading, setLoading] = useState(false);

  // The function automatically knows 'newQuery' is a string thanks to the SearchBarProps interface
  const handleSearchBarChange = (newQuery: string) => {
    // console.log("Query received from SearchBar:", newQuery);
    setCurrentSearchQuery(newQuery);
  };

  const handleQualifersChange = (newQualifierString: string) => {
    setQualifierQuery(newQualifierString);
  };

  const handleSearch = async (search: searchParams) => {
    try {
      setLoading(true);
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
      onSearchSuccess(data, data.length);
      setLoading(false);
      console.log("Search Results:", data);
    } catch (error) {
      setLoading(false);
      console.error("Failed to search repositories", error);
    }
  };

  const executeSearch = (page: number) => {
    const combinedQuery = [currentSearchQuery, qualiferQuery]
      .filter(Boolean)
      .join(" ")
      .trim();
    console.log(combinedQuery);
    if (combinedQuery) {
      handleSearch({ q: combinedQuery, per_page: 30, page: page });
    } else {
      console.log("Search aborted: Query is empty.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Always reset to page 1 for a new search
    executeSearch(1);
  };

  return (
    <>
      <div className="columns">
        <div className="column has-text-centered">
          <form className="box" onSubmit={handleSubmit}>
            <SearchBar onQueryChange={handleSearchBarChange} />
            <RuleSet onQualifiersChange={handleQualifersChange} />
          </form>
        </div>
      </div>
      {/* {Children} */}
    </>
  );
};

export default SearchForm;
