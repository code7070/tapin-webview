import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { convertRawDate as convert } from "../../helpers/util";
import style from "./PolisAccordion.module.scss";

const InsuranceCoverage = ({ isOpen, polisData, inactive }) => {
  const { search } = useLocation();
  const { polis: pPolis = 1 } = parse(search);

  if (inactive) return "";

  const polis = [...polisData];

  polis.length = pPolis;

  let dateSort = [];
  polis.map((x) => {
    dateSort.push(x.startDate);
    dateSort.push(x.endDate);
    dateSort.sort();
  });

  const forNum = [...dateSort];
  forNum.pop();

  const numSort = [];
  forNum.map((x) => {
    const count = [];
    polis.map((polis, ind) => {
      if (x >= polis.startDate && x < polis.endDate) {
        // Cause 2 leng pos data
        if (polis.length < 3) {
          if (ind > 0 && x !== polis[ind - 1].endDate) count.push(1);
          else if (ind === 0) count.push(1);
        } else count.push(1);
      }
    });
    return numSort.push({ date: x, count: count.length });
  });

  const gridWidth = `${100 / dateSort.length}%`;

  return (
    <div className={style.coverage}>
      <div className="text-center font-bold text-xs text-ottoBlue-100">
        Nilai Akumulasi Pertanggungan
      </div>
      <div
        style={{ position: "relative" }}
        className={isOpen ? "my-5" : "my-0"}
      >
        <div className="flex justify-start text-ottoGrey-300">
          {numSort.map((i, index) => (
            <div
              key={index}
              className="text-xs h-4 text-center "
              style={{ width: gridWidth, transform: "translate(50%, 0)" }}
            >
              {i.count} Juta
            </div>
          ))}
        </div>
        <div className="flex justify-between text-ottoGrey-300">
          {dateSort.map((date, index) => {
            const num = index + 1;
            return (
              <div
                key={num}
                className="flex flex-col items-start bg-blue-100 "
                style={{ width: gridWidth }}
              >
                <div className="h-24 w-px bg-ottoGrey-500" />
                <span className="text-xs">{convert(date)}</span>
              </div>
            );
          })}
        </div>
        <div
          className="absolute left-0 top-0 right-0"
          style={{ transform: "translate(0, 16px)" }}
        >
          {polis.map((data, index) => {
            const num = index + 1;
            const startPos = dateSort.indexOf(data.startDate);
            const endPos = dateSort.indexOf(data.endDate);
            let width = `0%`;
            let left = `0%`;
            const className = style[`polis${num}`];
            if (isOpen) {
              // width = `${(endPos - startPos) * 20}%`;
              // const countWidth = (polis.length / (dateSort.length - 1)) * 100;
              // const countWidth = 100 / polis.length;
              const countWidth = (100 / dateSort.length) * endPos;
              width = `${countWidth}%`;
              // left = `calc(${startPos * 20}% - ${startPos * 5}px)`;
              left = `${(100 / forNum) * startPos}%`;
              // left = `calc(${startPos * 32}% - ${startPos * 5}px)`;
            }
            return (
              <div
                className={className}
                style={{ width, maxWidth: "50%", left }}
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
  polisData: PropTypes.array,
  inactive: PropTypes.bool,
};

export default InsuranceCoverage;
