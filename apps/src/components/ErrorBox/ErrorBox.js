import { propTypesNode } from "helpers/util";
import PropTypes from "prop-types";

export default function ErrorBox({
  title = "ERROR TITLE",
  subtitle = "ERROR SUBTITLE",
}) {
  return (
    <div className="text-center my-10 mx-auto p-4 max-w-[320px] rounded-lg bg-red-100 border-4 border-red-300">
      <div className="text-xl font-bold text-red-700 mb-3">{title}</div>
      <div className="text-md text-red-600">{subtitle}</div>
    </div>
  );
}

ErrorBox.propTypes = {
  title: PropTypes.oneOfType([...propTypesNode, PropTypes.string]),
  subtitle: PropTypes.oneOfType([...propTypesNode, PropTypes.string]),
};
