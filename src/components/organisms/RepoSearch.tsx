import React from "react";

import { useState, useMemo } from "react";
import ResultList from "../molecule/ResultList/ResultList";
import LoadingIcon from "../atoms/LoadingIcon/LoadingIcon";
import PageButton from "../atoms/PageButton/PageButton";
import SearchFormQuery from "../molecule/SearchForm/SearchFormQuery";
import { useSearchParams } from "react-router-dom";

type dataType = {
  items: [];
  total_count: number;
};

const RepoSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 30; // matches per_page in SearchForm

  // 💡 1. Use useSearchParams to manage state in the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URL string values to numbers/strings
  const queryParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const perPageParam = parseInt(searchParams.get("per_page") || "30", 10);

  const totalPages = useMemo(() => {
    if (totalResults === 0) return 0;
    return Math.ceil(totalResults / pageSize);
  }, [totalResults, pageSize]); // Depend on totalResults and pageSize

  const handleSearchResults = (data: dataType) => {
    console.log(data);
    setResults(data);
    setTotalResults(data.total_count);
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(page));
    setSearchParams(newSearchParams); // Update the URL
  };

  const handleNewSearch = (query: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(`q`, query);
    newSearchParams.set("page", "1"); // Always reset to page 1 for a new search
    setSearchParams(newSearchParams);
  };
  return (
    <>
      <SearchFormQuery
        onSearchSuccess={handleSearchResults}
        setLoading={isLoading}
        currentPage={pageParam}
        currentQuery={queryParam}
        perPage={perPageParam}
        setCurrentPage={setCurrentPage}
        onNewSearch={handleNewSearch}
      />
      {/* Simple loading logic*/}
      {loading ? <LoadingIcon /> : <ResultList results={results} />}
      {totalResults > 0 && totalPages >= 1 && (
        <PageButton
          page={pageParam}
          handlePageChange={handlePageChange} // This calculation is correct and uses the value updated in the previous render cycle
          disableNext={pageParam >= totalPages}
        />
      )}
    </>
  );
};

export default RepoSearch;
