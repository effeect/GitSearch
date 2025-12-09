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
    <div className="container">
      <h3>Found {results.length} Repositories</h3>

      {results.map((repo, index) => (
        <div className="box" key={index}>
          <h1>{repo.full_name}</h1>
          <br />
          <p>{repo.description}</p>
          <strong>{repo.full_name}</strong> - {repo.stargazers_count} Stars
        </div>
      ))}
    </div>
  );
};

export default ResultList;
