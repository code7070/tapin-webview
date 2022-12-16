import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Loading, Icon } from "components";
import style from "./PolisAccordion.module.scss";

const PolisTitle = ({ title, onClick, isOpen, loading }) => {
  const tailwind =
    "outline-none block w-full cursor-pointer p-5 font-semibold text-ottoBlue-100 flex items-center justify-between focus:bg-slate-50 hover:bg-ottoGrey-500";
  const disable = loading && "pointer-events-none";
  const titleClassname = `${style.title} ${tailwind} ${disable}`;
  let titleView = <Skeleton width="100%" height={22} />;
  let iconView = <Loading />;
  if (!loading || title) {
    titleView = title;
    iconView = <Icon type="ChevronDown" />;
  }
  return (
    <button className={titleClassname} onClick={onClick}>
      <div>{titleView}</div>
      <div
        className={isOpen ? "rotate-180" : ""}
        style={{ transition: "0.25s ease-in-out" }}
      >
        {iconView}
      </div>
    </button>
  );
};

PolisTitle.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,
};

const PolisOwner = () => {
  const tailwind =
    "text-ottoGrey-100 text-sm leading-normal border-t border-ottoGrey-500";
  return (
    <div className={`${tailwind} ${style.identity}`}>
      <div>Kepemilikan Polis</div>
      <div className="font-semibold">Pribadi</div>
    </div>
  );
};

const PolisProvider = () => {
  const tailwind = "flex items-center border-t border-ottoGrey-500";
  return (
    <div className={`${tailwind} ${style.identity}`}>
      <div>
        <Icon type="InsuranceCiLogo" />
      </div>
      <div className="text-sm ml-4">
        <div className="text-ottoBlue-200">Tap In Insurance</div>
        <div className="text-ottoGrey-300">My Critical Illness</div>
      </div>
    </div>
  );
};

export { PolisTitle, PolisOwner, PolisProvider };
