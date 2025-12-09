import React, { useState } from "react";
import SearchForm from "../components/molecule/SearchForm/SearchForm";
import ResultList from "../components/molecule/ResultList/ResultList";
import LoadingIcon from "../components/atoms/LoadingIcon/LoadingIcon";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [loading, isLoading] = useState(false);
  const handleSearchResults = (data: any[]) => {
    setResults(data);
  };

  return (
    <>
      <SearchForm
        onSearchSuccess={handleSearchResults}
        setLoading={isLoading}
      />
      {/* Simple loading logic*/}
      {loading ? <LoadingIcon /> : <ResultList results={results} />}
    </>
  );
};

export default HomePage;
