import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { propTypesChildren } from "../../helpers/util";
import style from "./Accordion.module.scss";

export default function Accordion({
  title = "Accordion Title",
  isOpen,
  onClick,
  children,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log({ isOpen });
    setOpen(isOpen);
  }, [isOpen]);

  let colors = "text-ottoBlue-200";

  if (open) {
    colors = "text-ottoBlue-400";
  }

  return (
    <div className={`mb-2.5 ${style.accordion} ${open ? style.opened : ""}`}>
      <button
        className={`btn outline-none border-0 rounded-none block w-full overflow-hidden flex justify-between py-5 px-7 h-auto bg-ottoBlue-900 hover:bg-ottoBlue-700`}
        onClick={onClick}
      >
        <div
          className={`text-ellipsis normal-case font-normal text-lg ${colors}`}
        >
          {title}
        </div>
        <div className="flex">
          <div
            className={`${style.symbol} translate-x-px ${
              open ? "rotate-90" : ""
            }`}
          />
          <div className={`${style.symbol} rotate-90`} />
        </div>
      </button>
      <div className={style.content}>{children}</div>
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  children: propTypesChildren,
};
