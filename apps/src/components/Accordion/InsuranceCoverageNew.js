import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { convertRawDate as convert } from "../../helpers/util";
import style from "./PolisAccordion.module.scss";

function InsuranceCoverageNew({ polisData, isOpen, inactive }) {
  const { search } = useLocation();
  const { polis: pPolis = 1 } = parse(search);

  if (inactive) return "";

  const polis = [...polisData];
  polis.length = pPolis;

  const dateSort = [];
  polis.map((x) => {
    dateSort.push(x.startDate);
    dateSort.push(x.endDate);
    dateSort.sort();
  });

  const forNum = [...dateSort];
  forNum.pop();

  const coverage = [];
  forNum.map((date) => {
    let x = [];
    polis.map(({ endDate, startDate }) => {
      if (date >= startDate && date < endDate) x.push(1);
    });
    return coverage.push(x.length);
  });

  let cutter = forNum;
  const grid = 100 / cutter.length;

  const DateLine = ({ position = "left", date = "" }) => {
    let transform = "";
    if (position === "right") transform = "translate(100%, 0)";
    return (
      <div className={`absolute ${position}-0 top-0`} style={{ transform }}>
        <div className="w-px h-24 bg-ottoGrey-700" />
        <div
          className="text-[10px] font-extrabold text-ottoBlue-150 mt-2.5"
          style={{ transform: "translate(-50%, 0)" }}
        >
          {convert(date)}
        </div>
      </div>
    );
  };

  DateLine.propTypes = { position: PropTypes.string, date: PropTypes.number };

  const GridView = () => (
    <div className="flex relative">
      {forNum.map((x, index) => {
        const width = `${grid}%`;
        const coverageValue = `${coverage[index]} Juta`;
        return (
          <div key={x} style={{ width }} className={`relative h-24`}>
            <div
              className="text-xs text-center font-semibold text-[10px] text-ottoBlue-500"
              style={{ transform: "translate(0, -50%)" }}
            >
              {coverageValue}
            </div>
            <DateLine date={dateSort[index]} />
            {index + 2 === dateSort.length && (
              <DateLine position="right" date={dateSort[index + 1]} />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={style.coverage}>
      <div className="text-center font-bold text-xs text-ottoBlue-100">
        Nilai Akumulasi Pertanggungan
      </div>
      <div className="relative mt-4">
        <GridView />
        <div className="absolute top-0 left-0 h-24 w-full">
          {polis.map((x, index) => {
            const num = index + 1;
            const startPos = dateSort.indexOf(x.startDate);
            const endPos = dateSort.indexOf(x.endDate);
            let width = `0%`;
            const left = `${startPos * grid}%`;
            if (isOpen) width = `${(endPos - startPos) * grid}%`;
            const barStyle = { width, left };
            const barClass = style[`polis${num}`];
            const polisName = `Polis ${num} ${num}23-456-789`;
            return (
              <div key={polisName} className={barClass} style={barStyle}>
                {polisName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

InsuranceCoverageNew.propTypes = {
  polisData: PropTypes.array,
  isOpen: PropTypes.bool,
  inactive: PropTypes.bool,
};

export default InsuranceCoverageNew;
