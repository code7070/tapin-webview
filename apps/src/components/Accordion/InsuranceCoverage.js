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
    console.log("OPERATION: ", convert(x));
    polis.map((polis, ind) => {
      if (x >= polis.startDate && x < polis.endDate) {
        console.log(`--- Date ${convert(x)}`);
        console.log(`--- higher than ${convert(polis.startDate)}`);
        console.log(`--- lower than ${convert(polis.endDate)}`);
        console.log("Length: ", polis.length);

        // Cause 2 leng pos data
        if (polis.length < 3) {
          if (ind > 0 && x !== polis[ind - 1].endDate) count.push(1);
          else if (ind === 0) count.push(1);
        } else count.push(1);
      }
    });
    console.log(`Date: ${convert(x)}, Actives: ${count.length}`);
    numSort.push({ date: x, count: count.length });
    return console.log("===================================");
  });

  return (
    <div className={style.coverage}>
      <div className="text-center font-bold text-xs text-ottoBlue-100">
        Nilai Akumulasi Pertanggungan
      </div>
      <div
        style={{ position: "relative" }}
        className={isOpen ? "my-5" : "my-0"}
      >
        <div className="flex justify-center text-ottoGrey-300">
          {numSort.map((i, index) => (
            <div
              key={index}
              className="text-xs h-4 text-center"
              style={{ width: `calc(100%/${forNum.length})` }}
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
                className="flex flex-col items-start"
                style={{ transform: "translate(50%, 0)" }}
              >
                <div className="h-24 w-px bg-ottoGrey-500" />
                <span
                  className="text-xs"
                  style={{ transform: "translate(-50%, 0)" }}
                >
                  {convert(date)}
                </span>
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
            // const endPos = dateSort.indexOf(data.endDate);
            let width = `0%`;
            let left = `0%`;
            const className = style[`polis${num}`];
            if (isOpen) {
              // width = `${(endPos - startPos) * 20}%`;
              const countWidth = (polis.length / (dateSort.length - 1)) * 100;
              width = `${Math.ceil(countWidth)}%`;
              // left = `calc(${startPos * 20}% - ${startPos * 5}px)`;
              left = `${(100 / (dateSort.length - 1)) * startPos}%`;
              // left = `calc(${startPos * 32}% - ${startPos * 5}px)`;
            }
            return (
              <div className={className} style={{ width, left }} key={num}>
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
