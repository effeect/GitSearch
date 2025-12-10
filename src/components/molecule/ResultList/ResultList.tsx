// ResultList.tsx
import React from "react";
import { ResultField } from "../../atoms/ResultField/ResultField";

type RepoResult = {
  items: [];
  total_count: number;
};

interface ResultListProps {
  results: RepoResult;
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  // If we haven't searched for anything, just return nothing
  if (!results) {
    return null;
  }

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

  if (results.items) {
    return (
      <div className="container">
        <h3 className="title is-5 has-text-centered">
          Found {results.total_count} Repositories
        </h3>

        {results.items?.map((repo, index) => (
          <ResultField
            repo={repo}
            index={index}
            key={repo.id || repo.full_name || index}
          />
        ))}
      </div>
    );
  }
};

export default ResultList;
