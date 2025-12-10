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

  const totalPages = useMemo(() => {
    if (totalResults === 0) return 0;
    return Math.ceil(totalResults / pageSize);
  }, [totalResults, pageSize]); // Depend on totalResults and pageSize

  const handleSearchResults = (data: dataType) => {
    setResults(data);
    console.log(data);
    console.log(data.total_count);
    setTotalResults(data.total_count);
    setCurrentPage(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };
  return (
    <>
      <SearchFormQuery
        onSearchSuccess={handleSearchResults}
        setLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Simple loading logic*/}
      {loading ? <LoadingIcon /> : <ResultList results={results} />}
      {totalResults > 0 && totalPages >= 1 && (
        <PageButton
          page={currentPage}
          handlePageChange={handlePageChange} // This calculation is correct and uses the value updated in the previous render cycle
          disableNext={currentPage >= totalPages}
        />
      )}
    </>
  );
};

export default RepoSearch;
