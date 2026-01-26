import { Link } from "react-router-dom";
import type { PR } from "../ResultFieldProps";
export const PRBoxDetails = ({ info }: { info: PR }) => {
  return (
    <div className="columns is-mobile">
      <div className="column">
        {/* Repo Details */}
        <h1 className="title is-4">{info.title}</h1>
        <p className="subtitle is-6">{info.user.login}</p>
        <div className="">{info.body}</div>
        {/* Details of the Stars and Stuff*/}
      </div>
      <div className="column is-narrow ">
        <div className="mt-2"></div>
        <Link
          to={info.html_url}
          rel="noopener noreferrer" // Recommended for security when using target="_blank"
          className="button is-light is-small"
        >
          View Pull Request
        </Link>
      </div>
    </div>
  );
};
