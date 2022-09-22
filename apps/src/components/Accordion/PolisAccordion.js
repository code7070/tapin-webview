import PropTypes from "prop-types";
import { useState } from "react";
import { convertRawDate } from "../../helpers/util";
import Icon from "../Icon/Icon";
import style from "./PolisAccordion.module.scss";

const Title = ({ title, onClick, isOpen }) => {
  const tailwind =
    "outline-none block w-full cursor-pointer p-5 font-semibold text-ottoBlue-100 flex items-center justify-between focus:bg-slate-50 hover:bg-ottoGrey-500";
  return (
    <button className={`${style.title} ${tailwind}`} onClick={onClick}>
      <div>{title}</div>
      <div
        className={isOpen ? "rotate-180" : ""}
        style={{ transition: "0.25s ease-in-out" }}
      >
        <Icon type="ChevronDown" />
      </div>
    </button>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
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

const InsuranceProvider = () => {
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

const InsuranceCoverage = ({ isOpen }) => {
  const onePolis = [
    {
      name: "Polis 1",
      startDate: 1662570000000,
      endDate: 1665162000000,
    },
    {
      name: "Polis 2",
      startDate: 1664038800000,
      endDate: 1666630800000,
    },
    {
      name: "Polis 3",
      startDate: 1664902800000,
      endDate: 1667581200000,
    },
  ];

  let dateSort = [];
  onePolis.map((x) => {
    dateSort.push(x.startDate);
    dateSort.push(x.endDate);
    dateSort.sort();
  });

  console.log({ dateSort });

  return (
    <div className={style.coverage}>
      <div className="text-center font-bold text-xs text-ottoBlue-100">
        Nilai Akumulasi Pertanggungan
      </div>
      <div
        style={{ position: "relative" }}
        className={isOpen ? "my-5" : "my-0"}
      >
        <div className="flex justify-between text-ottoGrey-300">
          {dateSort.map((date, index) => {
            const num = index + 1;
            return (
              <div key={num} className="flex flex-col items-center">
                <div className="h-24 w-px bg-ottoGrey-500" />
                <span className="text-xs">{convertRawDate(date)}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute left-0 top-0 right-0">
          {onePolis.map((polis, index) => {
            const num = index + 1;
            const startPos = dateSort.indexOf(polis.startDate);
            const endPos = dateSort.indexOf(polis.endDate);
            const width = `${(endPos - startPos) * 20}%`;
            const left = `${startPos * 20}%`;
            return (
              <div
                className={style[`polis${num}`]}
                style={{ width, left }}
                key={num}
              >
                Polis {num}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

InsuranceCoverage.propTypes = {
  isOpen: PropTypes.bool,
};

export default function PolisAccordion({ title = "Title" }) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const tailwind = `rounded-md border border-ottoGrey-500`;
  const classOpen = isOpen ? style.open : "";

  return (
    <div className={`${style.polisAccordion} ${classOpen} ${tailwind}`}>
      <Title onClick={toggle} isOpen={isOpen} title={title} />
      <div className={style.content}>
        <InsuranceCoverage isOpen={isOpen} />
        <PolisOwner />
        <InsuranceProvider />
      </div>
    </div>
  );
}

PolisAccordion.propTypes = {
  title: PropTypes.string,
};
