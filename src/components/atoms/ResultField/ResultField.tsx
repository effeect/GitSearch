import type { ResultFieldProps } from "./ResultFieldProps";
import { RepoBoxDetails } from "./presets/RepoBoxDetails";
import { CommitBoxDetails } from "./presets/CommitBoxDetails";
import { PRBoxDetails } from "./presets/PRBoxDetails";
import { IssueBoxDetails } from "./presets/IssueBoxDetails";
import { CodeBoxDetails } from "./presets/CodeBoxDetaills";

// Function to create a div block with the result
export const ResultField = ({ index, repo, type }: ResultFieldProps) => {
  return (
    <div className="box">
      {type === "repo" ? (
        <RepoBoxDetails repo={repo}>
          {/*Shows the repo details*/}
        </RepoBoxDetails>
      ) : type === "commit" ? (
        <CommitBoxDetails repo={repo}>
          {/*Shows the commit details*/}
        </CommitBoxDetails>
      ) : type === "pr" ? (
        <PRBoxDetails info={repo} />
      ) : type === "code" ? (
        <CodeBoxDetails repo={repo} />
      ) : type === "issue" ? (
        <IssueBoxDetails info={repo} />
      ) : (
        <RepoBoxDetails repo={repo}>
          {/* Note, this is a fallback*/}
        </RepoBoxDetails>
      )}
    </div>
  );
};
