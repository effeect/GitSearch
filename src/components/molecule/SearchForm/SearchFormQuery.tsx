import {
  REPO_BOOLEAN_FIELDS,
  REPO_FIELD_OPTIONS,
  REPO_NUMERIC_FIELDS,
} from "../../../fields/RepoSearch";
import {
  COMMIT_FIELD_OPTIONS,
  COMMIT_BOOLEAN_FIELDS,
  COMMIT_NUMERIC_FIELDS,
} from "../../../fields/CommitSearch";
import {
  ISSUE_FIELD_OPTIONS,
  ISSUE_BOOLEAN_FIELDS,
  ISSUE_NUMERIC_FIELDS,
} from "../../../fields/IssueSearch";
import {
  CODE_FIELD_OPTIONS,
  CODE_BOOLEAN_FIELDS,
  CODE_NUMERIC_FIELDS,
} from "../../../fields/CodeSearch";

import SearchBar from "../../atoms/SearchBar/SearchBar";
import RuleSet from "../RuleSet/RuleSet";
import React from "react";
import { useState } from "react";

interface SearchFormProps {
  currentQuery: string;
  onNewSearch: (query: string) => void; // Function to update URL
  isRepo?: boolean;
  isCommit?: boolean;
  isPR?: boolean;
  isIssue?: boolean;
  isCode?: boolean;
}

const SearchFormQuery: React.FC<SearchFormProps> = ({
  currentQuery,
  onNewSearch,
  isRepo = false,
  isCommit = false,
  isPR = false,
  isIssue = false,
  isCode = false,
}) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [qualiferQuery, setQualifierQuery] = useState("");
  //Probably a better way to do it
  let [fields, booleanFields, numericFields] = [];
  if (isRepo) {
    fields = REPO_FIELD_OPTIONS;
    booleanFields = REPO_BOOLEAN_FIELDS;
    numericFields = REPO_NUMERIC_FIELDS;
  }
  if (isCommit) {
    fields = COMMIT_FIELD_OPTIONS;
    booleanFields = COMMIT_BOOLEAN_FIELDS;
    numericFields = COMMIT_NUMERIC_FIELDS;
  }
  if (isPR) {
    fields = ISSUE_FIELD_OPTIONS;
    booleanFields = ISSUE_BOOLEAN_FIELDS;
    numericFields = ISSUE_NUMERIC_FIELDS;
  }
  if (isIssue) {
    fields = ISSUE_FIELD_OPTIONS;
    booleanFields = ISSUE_BOOLEAN_FIELDS;
    numericFields = ISSUE_NUMERIC_FIELDS;
  }
  if (isCode) {
    fields = CODE_FIELD_OPTIONS;
    booleanFields = CODE_BOOLEAN_FIELDS;
    numericFields = CODE_NUMERIC_FIELDS;
  }

  const searchQuery = currentQuery;

  const getCombinedQuery = () => {
    return [currentSearchQuery, qualiferQuery].filter(Boolean).join(" ").trim();
  };

  // The function automatically knows 'newQuery' is a string thanks to the SearchBarProps interface
  const handleSearchBarChange = (newQuery: string) => {
    // console.log("Query received from SearchBar:", newQuery);
    setCurrentSearchQuery(newQuery);
  };
  const handleQualifersChange = (newQualifierString: string) => {
    setQualifierQuery(newQualifierString);
  };

  // Sending the search to the API!
  const executeSearch = () => {
    const query = getCombinedQuery();
    console.log(query);
    onNewSearch(query);

    console.log(searchQuery);
  };

  // First time submit of a query, only triggers when the form submits!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <>
      <div className="columns">
        <div className="column has-text-centered">
          <form className="box" onSubmit={handleSubmit}>
            <SearchBar onQueryChange={handleSearchBarChange} />
            <RuleSet
              onQualifiersChange={handleQualifersChange}
              FIELD_OPTIONS={fields}
              BOOLEAN_FIELDS={booleanFields}
              NUMERIC_FIELDS={numericFields}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchFormQuery;
