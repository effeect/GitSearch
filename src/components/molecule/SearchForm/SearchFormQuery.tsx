import SearchBar from "../../atoms/SearchBar/SearchBar";
import RuleSet from "../RuleSet/RuleSet";
import React from "react";
import { useState } from "react";

interface SearchFormProps {
  currentQuery: string;
  onNewSearch: (query: string) => void; // Function to update URL
}

const SearchFormQuery: React.FC<SearchFormProps> = ({
  currentQuery,
  onNewSearch,
}) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [qualiferQuery, setQualifierQuery] = useState("");

  const searchQuery = currentQuery;

  const getCombinedQuery = () => {
    return [currentSearchQuery, qualiferQuery].filter(Boolean).join(" ").trim();
  };

  // The function automatically knows 'newQuery' is a string thanks to the SearchBarProps interface
  const handleSearchBarChange = (newQuery: string) => {
    // console.log("Query received from SearchBar:", newQuery);
    setCurrentSearchQuery(newQuery);
  };
  const handleQualifersChange = (newQualifierString: string) => {
    setQualifierQuery(newQualifierString);
  };

  // Sending the search to the API!
  const executeSearch = () => {
    const query = getCombinedQuery();
    console.log(query);
    onNewSearch(query);

    console.log(searchQuery);
  };

  // First time submit of a query, only triggers when the form submits!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
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
    </>
  );
};

export default SearchFormQuery;
