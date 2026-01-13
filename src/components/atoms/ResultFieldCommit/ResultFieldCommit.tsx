import React from "react";
// Function to create a div block with the result and details within it
import { Link } from "react-router-dom";

type Repo = {
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  commit: { message: string; url: string };
};

type ResultFieldProps = {
  index: number;
  repo: Repo;
};

export const ResultFieldCommit = ({ index, repo }: ResultFieldProps) => {
  return (
    <div className="box">
      <div className="columns is-mobile">
        <div className="column">
          {/* Repo Details */}
          <h1 className="title is-4">{repo.author.login}</h1>
          <p className="subtitle is-6">{repo.commit.message}</p>
          {/* Details of the Stars and Stuff*/}
        </div>
        <div className="column is-narrow ">
          <div className="mt-2"></div>
          <Link
            to={repo.commit.url}
            rel="noopener noreferrer" // Recommended for security when using target="_blank"
            className="button is-light is-small"
          >
            View Commit on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultFieldCommit;
