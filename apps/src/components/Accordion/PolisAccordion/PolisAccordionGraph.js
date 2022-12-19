import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import style from "./PolisAccordion.module.scss";
import { numMillion } from "helpers/util";

const DateLine = ({ position = "left", date = "" }) => {
  let transform = "";
  if (position === "right") transform = "translate(100%, 0)";
  return (
    <div className={`absolute ${position}-0 top-0`} style={{ transform }}>
      <div className="w-px h-24 bg-ottoGrey-700" />
      <div className={style.polisTextDate}>
        {format(new Date(date), "dd/MM")}
      </div>
    </div>
  );
};

DateLine.propTypes = {
  position: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const GridView = ({ forNum, grid, coverage, dateSort = [] }) =>
  forNum && (
    <div className="flex relative">
      {forNum.map((x, index) => {
        const width = `${grid}%`;
        const coverageValue = numMillion(coverage[index]);
        return (
          <div key={x} style={{ width }} className={`relative h-24`}>
            <div className={style.polisCoverageAmmount}>{coverageValue}</div>
            <DateLine date={dateSort[index]} />
            {index + 2 === dateSort.length && (
              <DateLine position="right" date={dateSort[index + 1]} />
            )}
          </div>
        );
      })}
    </div>
  );

GridView.propTypes = {
  forNum: PropTypes.array,
  grid: PropTypes.number,
  coverage: PropTypes.array,
  dateSort: PropTypes.array,
};

const PolisBar = ({ item, index, dateSort, isOpen, grid }) => {
  const num = index + 1;
  const startPos = dateSort.indexOf(item.coverageStart);
  const endPos = dateSort.indexOf(item.coverageEnd);
  let width = `0%`;
  if (isOpen) width = `${(endPos - startPos) * grid}%`;
  const barClass = style[`polis${num}`];
  const styles = { width, left: `${startPos * grid}%` };
  const polisName = `Polis ${item.receiptNo}`;
  return (
    <div key={polisName} className={barClass} style={styles}>
      {polisName}
    </div>
  );
};

PolisBar.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  dateSort: PropTypes.array,
  isOpen: PropTypes.bool,
  grid: PropTypes.number,
};

function PolisAccordionGraph({ polisData, isOpen, inactive }) {
  const { search } = useLocation();
  const { polis: pPolis = 3 } = parse(search);

  if (inactive) return "";

  const polis = [...polisData];
  polis.length = pPolis;

  const dateSort = [];
  polis.map((x) => {
    dateSort.push(x.coverageStart);
    dateSort.push(x.coverageEnd);
    dateSort.sort();
  });

  const forNum = [...dateSort];
  forNum.pop();

  const coverage = [];
  forNum.map((date) => {
    let x = [];
    polis.map(({ coverageEnd, coverageStart, coverageAmount }) => {
      if (date >= coverageStart && date < coverageEnd) x.push(coverageAmount);
    });
    return coverage.push(x.reduce((prev, curr) => prev + curr));
  });

  let cutter = forNum;
  const grid = 100 / cutter.length;

  return (
    <div className={style.coverage}>
      <div className="text-center font-bold text-xs text-ottoBlue-100">
        Nilai Akumulasi Pertanggungan
      </div>
      <div className="relative mt-4">
        <GridView
          forNum={forNum || {}}
          dateSort={dateSort}
          grid={grid}
          coverage={coverage}
        />
        <div className="absolute top-0 left-0 h-24 w-full">
          {polis.map((item, index) => (
            <PolisBar
              key={index}
              item={item}
              index={index}
              isOpen={isOpen}
              grid={grid || 0}
              dateSort={dateSort}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

PolisAccordionGraph.propTypes = {
  polisData: PropTypes.array,
  isOpen: PropTypes.bool,
  inactive: PropTypes.bool,
};

export default PolisAccordionGraph;