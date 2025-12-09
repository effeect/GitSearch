// Function to create a div block with the result and details within it

import React from "react";
import { Link } from "react-router-dom";
// Definitions from the result of the API
type Repo = {
  full_name: string;
  description: string;
  stargazers_count: string;
  forks: string;
  html_url: string;
};

type ResultFieldProps = {
  index: number;
  repo: Repo;
};

export const ResultField = ({ index, repo }: ResultFieldProps) => {
  return (
    <>
      <div className="box" key={index}>
        <div className="columns is-mobile">
          <div className="column">
            {/* Repo Details */}
            <h1 className="title is-4">{repo.full_name}</h1>
            <p className="subtitle is-6">{repo.description}</p>
            {/* Details of the Stars and Stuff*/}
            <p className="is-size-7">
              <strong>Stars:</strong> {repo.stargazers_count}{" "}
              <strong>Forks:</strong> {repo.forks}
            </p>
          </div>
          <div className="column is-narrow ">
            {/* The Button Links! */}
            <Link
              to={repo.html_url}
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Recommended for security when using target="_blank"
              className="button is-info is-small"
            >
              View on Gitsearch
            </Link>
            <div className="mt-2"></div>
            <Link
              to={repo.html_url}
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Recommended for security when using target="_blank"
              className="button is-light is-small"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
