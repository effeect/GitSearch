import React, { useState } from "react";
import SearchForm from "../components/molecule/SearchForm/SearchForm";
import ResultList from "../components/molecule/ResultList/ResultList";
const HomePage = () => {
  const [results, setResults] = useState([]);
  const handleSearchResults = (data: any[]) => {
    setResults(data);
  };

  return (
    <>
      <SearchForm onSearchSuccess={handleSearchResults} />
      <ResultList results={results} />
    </>
  );
};

export default HomePage;
