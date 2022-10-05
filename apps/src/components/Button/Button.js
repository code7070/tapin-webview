import PropTypes from "prop-types";

export default function Button({
  children,
  onClick = () => {},
  disabled = false,
  type = "button",
  model,
  large = false,
}) {
  let defClass = "btn-primary";
  if (model === "secondary") defClass = "btn-primary btn-outline";
  else if (model === "plain") defClass = "btn-ghost w-11";

  const clsLarge = large ? "btn-block max-w-xs mx-auto btn-lg text-base" : "";
  const fullClass = `btn ${defClass} ${clsLarge} h-10 mx-2 normal-case`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={fullClass}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  large: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  model: PropTypes.string,
};
