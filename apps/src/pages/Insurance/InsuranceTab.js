import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./InsurancePage.module.scss";

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
  const { pathname: path } = useLocation();
  const navigate = useNavigate();

  const nav = (to) => navigate(`/insurance/ci/${to}`);

  const man = () => nav("detail");
  const doc = () => nav("dokumen");

  let activeTab = "detail";
  if (path.includes("/dokumen")) activeTab = "dokumen";

  return (
    <div className="insuranceTab w-full flex items-center">
      <TabItem isActive={activeTab === "detail"} onClick={man}>
        Detail Manfaat
      </TabItem>
      <TabItem isActive={activeTab === "dokumen"} onClick={doc}>
        Dokumen Polis
      </TabItem>
    </div>
  );
}
