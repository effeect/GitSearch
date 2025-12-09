import React from "react";

import { useState, useMemo } from "react";
import SearchForm from "../molecule/SearchForm/SearchForm";
import ResultList from "../molecule/ResultList/ResultList";
import LoadingIcon from "../atoms/LoadingIcon/LoadingIcon";
import PageButton from "../atoms/PageButton/PageButton";

const RepoSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 30; // matches per_page in SearchForm

  // UseMemo is actually super cool imo https://react.dev/reference/react/useMemo
  // TODO, handle if the search is exactly 30 but the next page is empty!
  const totalPages = useMemo(() => {
    // console.log(totalResults);
    if (totalResults < 30) return 0;
    else return 1;
  }, [totalResults, pageSize]);

  const handleSearchResults = (data: any[], totalCount: number) => {
    setResults(data);
    setTotalResults(totalCount);
    // console.log(data);
    // console.log(totalPages);
    // console.log(currentPage >= totalPages);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };
  return (
    <>
      <SearchForm
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
          disableNext={totalPages == 0}
        />
      )}
    </>
  );
};

export default RepoSearch;
