import { Link } from "react-router-dom";
import type { Commit } from "../ResultFieldProps";
export const CodeBoxDetails = ({ repo }: { repo: Commit }) => {
  return (
    <div className="columns is-mobile">
      <div className="column">
        {/* Repo Details */}
        <h1 className="title is-4"></h1>
        <p className="subtitle is-6"></p>
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
  );
};
