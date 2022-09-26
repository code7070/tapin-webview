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

  return (
    <div className={`mb-2.5 ${style.accordion} ${open ? style.opened : ""}`}>
      <button
        className={`btn outline-none border-0 rounded-none block w-full overflow-hidden text-ellipsis flex justify-between normal-case font-normal text-lg py-5 px-7 h-auto bg-ottoBlue-900 hover:bg-ottoBlue-700 ${
          open ? "text-ottoBlue-50" : "text-ottoBlue-200"
        }`}
        onClick={onClick}
      >
        <div>{title}</div>
        <div
          className={`${style.symbol} flex [&>*]:ease-in-out [&>*]:duration-500 [&>*]:bg-ottoBlue-200 [&>*]:w-px [&>*]:h-2`}
        >
          <div className={`translate-x-px ${open ? "rotate-90" : ""}`} />
          <div className={`rotate-90`} />
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
