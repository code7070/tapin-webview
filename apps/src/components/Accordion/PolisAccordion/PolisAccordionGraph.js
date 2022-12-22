import PropTypes from "prop-types";
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
        const coverageValue =
          coverage[index] > 0 ? numMillion(coverage[index]) : "-";
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
  const startPos = dateSort.indexOf(item.coverageStartDate);
  const endPos = dateSort.indexOf(item.coverageEndDate);
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
  if (inactive) return "";
  const polis = [...polisData];

  const dateSort = [];
  polis.map((x) => {
    dateSort.push(x.coverageStartDate);
    dateSort.push(x.coverageEndDate);
    dateSort.sort();
  });

  const forNum = [...dateSort];
  forNum.pop();

  const coverage = [];
  forNum.map((date) => {
    let x = [];
    polis.map(({ coverageEndDate, coverageStartDate, coverageAmount }) => {
      if (date >= coverageStartDate && date < coverageEndDate)
        x.push(coverageAmount);
    });
    return (
      x.length &&
      coverage.push(
        x.reduce((prev, curr) => parseInt(prev, 10) + parseInt(curr, 10))
      )
    );
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
