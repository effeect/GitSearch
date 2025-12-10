import { useMemo } from "react";
import ResultList from "../molecule/ResultList/ResultList";
import LoadingIcon from "../atoms/LoadingIcon/LoadingIcon";
import PageButton from "../atoms/PageButton/PageButton";
import SearchFormQuery from "../molecule/SearchForm/SearchFormQuery";
import { useSearchParams } from "react-router-dom";
import fetchRepoData from "../../api/fetchGithubRepos";
import { useQuery } from "@tanstack/react-query";

const RepoSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URL string values to numbers/strings
  const queryParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const perPageParam = parseInt(searchParams.get("per_page") || "30", 10);

  const { data, isLoading, error } = useQuery({
    // The Query Key uses the URL-driven state directly
    queryKey: [
      "repoData",
      { q: queryParam, per_page: perPageParam, page: pageParam },
    ],
    queryFn: () => fetchRepoData(queryParam, perPageParam, pageParam),
    enabled: !!queryParam, // Only fetch if a query exists
    staleTime: 1000 * 60 * 5,
  });

  const results = data || [];
  const totalResults = data?.total_count || 0;
  const pageSize = perPageParam;

  const totalPages = useMemo(() => {
    if (totalResults === 0) return 0;
    return Math.ceil(totalResults / pageSize);
  }, [totalResults, pageSize]); // Depend on totalResults and pageSize

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
        currentQuery={queryParam}
        onNewSearch={handleNewSearch}
      />
      {/* Simple loading logic*/}
      {error?.message ? <div>Error has occured</div> : null}
      {isLoading ? <LoadingIcon /> : <ResultList results={results} />}
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
