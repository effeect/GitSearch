// ResultList.tsx
import React from "react";
import { ResultField } from "../../atoms/ResultField/ResultField";

type RepoResult = any;

interface ResultListProps {
  results: RepoResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="container">
        <h3 className="title is-5 has-text-centered">No repositories found.</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="title is-5 has-text-centered">
        Found {results.length} Repositories
      </h3>

      {results.map((repo, index) => (
        <ResultField repo={repo} index={index} />
      ))}
    </div>
  );
};

export default ResultList;
