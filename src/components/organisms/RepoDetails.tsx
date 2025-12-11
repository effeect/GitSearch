import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchRepoDetails from "../../api/fetchRepoDetails";
import LoadingIcon from "../atoms/LoadingIcon";
import LinkButton from "../atoms/LinkButton";

import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

const RepoDetails = () => {
  // States from React for the App
  const { owner: rawOwner, repo: rawRepo } = useParams();
  const owner = rawOwner ?? "";
  const repo = rawRepo ?? "";

  // React query hook to get data against the repo in question
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
  console.log(data);
  return (
    <section className="hero is-large is-dark">
      <div className="hero-body">
        <p className="title">
          {owner}/{repo}
        </p>
        {isLoading ? (
          <LoadingIcon />
        ) : error ? (
          <p className="subtitle"> {error?.message}</p>
        ) : (
          <p className="subtitle">{results.description}</p>
        )}
        <div className="mt-4"></div>
        <p className="subtitle"></p>
        <LinkButton
          icon={faCog}
          to="Hello"
          text="this sucks"
          buttonClass="is-danger"
        />
      </div>
    </section>
  );
};

export default RepoDetails;
