import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchButton = ({ isAddon = false }) => {
  return (
    <>
      {isAddon ? (
        <div className="control">
          <button type="submit" className="button is-primary">
            <span className="icon">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </button>
        </div>
      ) : (
        <button type="submit" className="button is-primary">
          <span className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </button>
      )}
    </>
  );
};

export default SearchButton;
