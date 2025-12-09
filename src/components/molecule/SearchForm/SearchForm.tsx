import SearchBar from "../../atoms/SearchBar/SearchBar";
import RuleSet from "../RuleSet/RuleSet";
import React, { Children } from "react";
import { useState, useRef, useEffect } from "react";

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
  currentPage,
  setCurrentPage,
}) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [qualiferQuery, setQualifierQuery] = useState("");
  // const [loading, setLoading] = useState(false);
  // Call below to get the final query to combine and make up
  const getCombinedQuery = () =>
    [currentSearchQuery, qualiferQuery].filter(Boolean).join(" ").trim();

  const isFirstRender = useRef(true);

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
      console.log(data);
      onSearchSuccess(data, data.length);

      console.log("Search Results:", data);
    } catch (error) {
      console.error("Failed to search repositories", error);
    } finally {
      setLoading(false);
    }
  };

  // Sending the search to the API!
  const executeSearch = (page: number) => {
    const query = getCombinedQuery();
    if (query) {
      handleSearch({ q: query, per_page: 30, page: page });
    } else {
      console.log("Search aborted: Query is empty.");
      onSearchSuccess([], 0);
    }
  };

  // First time submit of a query, only triggers when the form submits!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    executeSearch(1);
  };

  // Here to prevent issue when first booting up the site
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    executeSearch(currentPage);
  }, [currentPage]);
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
    </>
  );
};

export default SearchForm;
