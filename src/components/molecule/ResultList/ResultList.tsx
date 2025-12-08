// ResultList.tsx
import React from "react";
type RepoResult = any;

interface ResultListProps {
  results: RepoResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  if (results.length === 0) {
    return <div>No repositories found. Start a search!</div>;
  }

  return (
    <div>
      <h3>Found {results.length} Repositories</h3>
      <ul>
        {results.map((repo, index) => (
          <li key={repo.id || index}>
            <strong>{repo.full_name}</strong> - {repo.stargazers_count} Stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
