import PropTypes from "prop-types";
import { propTypesChildren } from "helpers/util";

export default function LinkNewTab({
  href,
  children,
  className = "hover:underline",
  ...props
}) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

LinkNewTab.propTypes = {
  href: PropTypes.string,
  children: propTypesChildren,
  className: PropTypes.string,
};
