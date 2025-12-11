import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface LinkButtonProps {
  to: string;
  text: string;
  icon?: IconProp;
  buttonClass?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  text,
  icon,
  buttonClass = "is-primary",
}) => {
  const bulmaClass = `button ${buttonClass}`;
  return (
    <Link to={to} className={bulmaClass}>
      {/* Conditionally render the icon if provided */}
      {icon && (
        <span className="icon">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span>{text}</span>
    </Link>
  );
};

export default LinkButton;
