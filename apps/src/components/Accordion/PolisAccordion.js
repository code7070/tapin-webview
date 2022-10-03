import PropTypes from "prop-types";
import { parse } from "query-string";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { convertRawDate } from "../../helpers/util";
import Icon from "../Icon/Icon";
// import InsuranceCoverage from "./InsuranceCoverage";
import InsuranceCoverageNew from "./InsuranceCoverageNew";
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

const PolisItem = ({ title, linkText, linkHref, inactive }) => {
  let color = "text-ottoBlue-200";
  let colorTitle = "text-ottoBlue-100";
  if (inactive) {
    color = "text-ottoGrey-300 pointer-events-none";
    colorTitle = color;
  }

  return (
    <div className="flex w-full overflow-hidden py-2.5 px-5 w-full hover:bg-slate-100">
      <div className="pr-4 flex-1 w-4/5">
        <div className={`${colorTitle} font-semibold text-sm`}>{title}</div>
        <a
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className={`${color} text-sm hover:underline block w-full break-words`}
        >
          {linkText}
        </a>
      </div>
      <div className="w-1/12">
        <Icon type={`PdfIcon${inactive ? "Disabled" : ""}`} />
      </div>
    </div>
  );
};

PolisItem.propTypes = {
  title: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  margin: PropTypes.bool,
  inactive: PropTypes.bool,
};

const PolisFile = ({ inactive, polisData }) => {
  const { search } = useLocation();
  const { polis: pPolis = 1 } = parse(search);

  const polis = [...polisData];

  polis.length = pPolis;

  return (
    <div>
      {polis.map((item, index) => {
        const isLast = index === polis.length - 1;
        return (
          <div key={item.startDate} className="pt-2.5">
            <div>
              <div className="px-5 text-xs text-ottoGrey-300">
                {convertRawDate(item.startDate, true, true)}
              </div>
              <PolisItem
                title={`Tanda Bukti Transaksi ${item.transcation.name}`}
                linkText={item.transcation.fileName}
                linkHref={item.transcation.file}
                margin
                inactive={inactive}
              />
              <PolisItem
                title={`Sertifikat Asuransi`}
                linkText={item.certificate.fileName}
                linkHref={`https://aktiva-relay.ap-south-1.linodeobjects.com/public/e0eb0a77-01d6-4385-86ca-ca26d09b7f44/NPWP-PT%20Aktiva%20Kreasi%20Investama.pdf`}
                inactive={inactive}
              />
              {!isLast && (
                <div
                  className="bg-ottoGrey-500 my-2.5"
                  style={{
                    position: "relative",
                    width: "calc(100% - 40px)",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    height: "1px",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

PolisFile.propTypes = {
  inactive: PropTypes.bool,
  polisData: PropTypes.array,
};

export default function PolisAccordion({
  title = "Title",
  inactive = false,
  polisData = [],
}) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const tailwind = `rounded-md border border-ottoGrey-500 mb-4`;
  const classOpen = isOpen ? style.open : "";

  return (
    <div className={`${style.polisAccordion} ${classOpen} ${tailwind}`}>
      <Title onClick={toggle} isOpen={isOpen} title={title} />
      <div className={style.content}>
        <InsuranceCoverageNew
          inactive={inactive}
          polisData={polisData}
          isOpen={isOpen}
        />
        <PolisFile polisData={polisData} inactive={inactive} />
        <PolisOwner />
        <InsuranceProvider />
      </div>
    </div>
  );
}

PolisAccordion.propTypes = {
  title: PropTypes.string,
  inactive: PropTypes.bool,
  polisData: PropTypes.array,
};
