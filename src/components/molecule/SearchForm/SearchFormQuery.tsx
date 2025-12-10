import { useQuery } from "@tanstack/react-query";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import RuleSet from "../RuleSet/RuleSet";
import React, { Children } from "react";
import { useState, useRef, useEffect } from "react";
import fetchRepoData from "../../../api/fetchGithubRepos";

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

const SearchFormQuery: React.FC<SearchFormProps> = ({
  onSearchSuccess,
  setLoading,
  currentPage,
  setCurrentPage,
}) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [qualiferQuery, setQualifierQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const getCombinedQuery = () =>
    [currentSearchQuery, qualiferQuery].filter(Boolean).join(" ").trim();

  // React Query is here with all the things we need
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", { q: searchQuery, per_page: 30, page: currentPage }],
    queryFn: () => fetchRepoData(searchQuery, 30, currentPage),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });

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
    setSearchQuery(query);

    console.log(searchQuery);
  };

  // First time submit of a query, only triggers when the form submits!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    executeSearch();
  };

  useEffect(() => {
    // 1a. Update Parent's Loading State
    setLoading(isLoading);
    console.log(data);
    // console.log(data.items);
    // 1b. Handle Data Success
    // 'data' will be defined if the query was successful and not loading
    if (data && !isLoading) {
      onSearchSuccess(data);
    }
    if (error) {
      console.error("React Query Error:", error);
    }
  }, [data, isLoading, error, onSearchSuccess, setLoading]);

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
