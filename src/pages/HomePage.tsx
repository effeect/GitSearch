import React, { useState } from "react";
import SearchForm from "../components/molecule/SearchForm/SearchForm";
import ResultList from "../components/molecule/ResultList/ResultList";
import LoadingIcon from "../components/atoms/LoadingIcon/LoadingIcon";
import PageButton from "../components/atoms/PageButton/PageButton";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 30; // matches per_page in SearchForm

  const handleSearchResults = (data: any[], totalCount: number) => {
    console.log(data);
    setResults(data);
    console.log(totalCount);

    setTotalResults(totalCount);
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      {totalResults > 0 && totalPages > 1 && (
        <PageButton
          page={currentPage}
          handlePageChange={handlePageChange} // This function just sets the state
          disableNext={currentPage >= totalPages}
        />
      )}
    </>
  );
};

export default HomePage;
