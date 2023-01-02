import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Tab.module.scss";

const TabItem = ({ children = "Tab Item", isActive = false, onClick }) => {
  const fullClass = `${style.tab} ${isActive ? style.active : ""}`;
  return (
    <button className={fullClass} onClick={onClick}>
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

const TabPlaceholder = () => (
  <div className="flex">
    <div className="flex-1 my-2 mx-1 border-red-100">
      <Skeleton height={66} width="100%" />
    </div>
    <div className="flex-1 my-2 mx-1 border-red-100">
      <Skeleton height={66} width="100%" />
    </div>
  </div>
);

export default function InsuranceTab() {
  const { search, pathname: path } = useLocation();
  const navigate = useNavigate();

  const plans = useSelector(({ insurancePlans }) => insurancePlans.plans);

  const nav = (to) => navigate(`/insurance/${to}${search}`);

  const man = () => nav("detail");
  const doc = () => nav("dokumen");

  let activeTab = "detail";
  if (path.includes("/dokumen")) activeTab = "dokumen";

  let view = "";
  if (!plans.active && !plans.inactive) view = <TabPlaceholder />;
  else if (plans.active.length > 0 || plans.inactive.length > 0)
    view = (
      <div className="insuranceTab w-full flex items-center">
        <TabItem isActive={activeTab === "detail"} onClick={man}>
          Detail Manfaat
        </TabItem>
        <TabItem isActive={activeTab === "dokumen"} onClick={doc}>
          Dokumen Polis
        </TabItem>
      </div>
    );

  return view;
}
