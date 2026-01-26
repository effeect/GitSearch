// ResultList.tsx
import React from "react";
import { ResultField } from "../../atoms/ResultField/ResultField";

type RepoResult = {
  items: [];
  total_count: number;
};

interface ResultListProps {
  results: RepoResult;
  isRepo?: boolean;
  isCommit?: boolean;
  isPR?: boolean;
  isIssue?: boolean;
  isCode?: boolean;
}

const ResultList: React.FC<ResultListProps> = ({
  results,
  isRepo = false,
  isCommit = false,
  isPR = false,
  isIssue = false,
  isCode = false,
}) => {
  // If we haven't searched for anything, just return nothing
  if (!results) {
    return null;
  }
  const getType = () => {
    if (isRepo) return "repo";
    if (isCommit) return "commit";
    if (isPR) return "pr";
    if (isIssue) return "issue";
    if (isCode) return "code";
    // Will execute return to repo is nothing is set :
    return "repo";
  };
  // If no results found, just
  if (results.total_count === 0) {
    return (
      <div className="container">
        <h3 className="title is-5 has-text-centered">
          No repositories found. Try again!
        </h3>
      </div>
    );
  }
  const type = getType();
  if (results.items) {
    return (
      <div className="container">
        <h3 className="title is-5 has-text-centered">
          Found {results.total_count} Results
        </h3>
        {results.items?.map((repo, index) => (
          <ResultField
            repo={repo}
            index={index}
            key={repo.id || repo.full_name || index}
            type={type}
          />
        ))}
      </div>
    );
  }
};

export default ResultList;
