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
        {date ? format(new Date(date), "dd/MM") : ""}
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
  let startPos = dateSort.indexOf(item.coverageStartDate);
  let endPos = dateSort.indexOf(item.coverageEndDate);
  let width = `0%`;
  if (isOpen) width = `${(endPos - startPos) * grid}%`;

  if (dateSort.length <= 2) {
    startPos = 0;
    endPos = 100;
    width = "100%";
  }

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

  const tempDateSort = [];
  let dateSort = [];

  polis.map((x) => {
    tempDateSort.push(x.coverageStartDate);
    tempDateSort.push(x.coverageEndDate);
    tempDateSort.sort();
  });

  tempDateSort.map((x, i) => {
    const n = `${tempDateSort[i]}`.slice(0, 10);
    const m = `${tempDateSort[i + 1]}`.slice(0, 10);
    if (n !== m) dateSort.push(n);
  });

  const forNum = [...dateSort];
  forNum.pop();

  const coverage = [];
  tempDateSort.map((date) => {
    let x = [];
    const par = (num) => parseInt(num, 10);
    polis.map(({ coverageEndDate, coverageStartDate, coverageAmount }) => {
      if (date >= coverageStartDate && date < coverageEndDate)
        x.push(par(coverageAmount));
    });
    return (
      x.length && coverage.push(x.reduce((prev, curr) => par(prev) + par(curr)))
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
