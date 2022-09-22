import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./InsuranceDetail.module.scss";

const TabItem = ({ children = "Tab Item", isActive = false, onClick }) => {
  const activeClass = "border-ottoBlue-300 text-ottoGrey-200";
  const fullClass = isActive
    ? `${activeClass} ${style.active}`
    : "border-transparent";
  const fullClassName = `border-b-2 ${style.tab} ${fullClass} flex-1`;
  return (
    <button className={fullClassName} onClick={onClick}>
      {children}
    </button>
  );
};

TabItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function InsuranceTab() {
  const { pathname: path, search } = useLocation();
  const navigate = useNavigate();
  const parsed = parse(search);

  const man = () => {
    navigate({ pathname: path, search: "tab=detail" }, { replace: true });
  };
  const doc = () => {
    navigate({ pathname: path, search: "tab=dokumen" }, { replace: true });
  };

  return (
    <div className="insuranceTab w-full flex items-center">
      <TabItem isActive={parsed.tab !== "dokumen"} onClick={man}>
        Detail Manfaat
      </TabItem>
      <TabItem isActive={parsed.tab === "dokumen"} onClick={doc}>
        Dokumen Polis
      </TabItem>
    </div>
  );
}
