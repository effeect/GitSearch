import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchRepoDetails from "../../api/fetchRepoDetails";
import LoadingIcon from "../atoms/LoadingIcon";
import LinkButton from "../atoms/LinkButton";

import {
  faCodeCommit,
  faCodePullRequest,
  faWarning,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

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
  return (
    <section className="hero is-large is-dark">
      <div className="hero-body has-text-centered">
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

        {/* Column layout for the buttons to access the search functions of the application*/}

        {isLoading ? null : ButtonLayout()}
      </div>
    </section>
  );

  function ButtonLayout() {
    return (
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <LinkButton
            icon={faCodeCommit}
            to="commit"
            text="Commit Search"
            buttonClass="is-link"
          />
        </div>
        <div className="column">
          <LinkButton
            icon={faCode}
            to="code"
            text="Code Search"
            buttonClass="is-link"
          />
        </div>
        <div className="column">
          <LinkButton
            icon={faCodePullRequest}
            to="pr"
            text="PR Search"
            buttonClass="is-link"
          />
        </div>
        <div className="column">
          <LinkButton
            icon={faWarning}
            to="issue"
            text="Issue Search"
            buttonClass="is-link"
          />
        </div>
        <div className="column"></div>
      </div>
    );
  }
};

export default RepoDetails;
