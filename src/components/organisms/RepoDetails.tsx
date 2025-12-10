import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchRepoDetails from "../../api/fetchRepoDetails";
import LoadingIcon from "../atoms/LoadingIcon/LoadingIcon";

const RepoDetails = () => {
  // States from React for the App
  const { owner: rawOwner, repo: rawName } = useParams();
  const owner = rawOwner ?? "";
  const repo = rawName ?? "";

  const { data, isLoading, error } = useQuery({
    // The Query Key uses the URL-driven state directly
    queryKey: [
      "repoDetails",
      {
        owner,
        repo,
      },
    ],
    queryFn: () => fetchRepoDetails(owner, repo),
    enabled: !!owner, // Only fetch if a query exists
    staleTime: 1000 * 60 * 5,
  });

  const results = data || [];
  return (
    // <div className="container">
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="">
          <p className="title">
            {owner}/{repo}
          </p>
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <p className="subtitle"> {data.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RepoDetails;
