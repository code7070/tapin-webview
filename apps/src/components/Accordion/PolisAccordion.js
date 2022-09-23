import PropTypes from "prop-types";
import { parse } from "query-string";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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

const polisData = [
  {
    name: "Polis 1",
    startDate: 1662634800000,
    endDate: 1665162000000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 111,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
  {
    name: "Polis 2",
    startDate: 1664102100000,
    endDate: 1666630800000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 222,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
  {
    name: "Polis 3",
    startDate: 1664962200000,
    endDate: 1667581200000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 333,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
];

const InsuranceCoverage = ({ isOpen }) => {
  const { search } = useLocation();
  const { polis: pPolis = 1 } = parse(search);

  const polis = [...polisData];

  polis.length = pPolis;
  console.log({ pPolis, polis });

  let dateSort = [];
  polis.map((x) => {
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
              left = `calc(${startPos * 20}% - ${startPos * 5}px)`;
              // left = `calc(${startPos * 32}% - ${startPos * 5}px)`;
            }
            console.log({ width, name: data.name });
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
};

const PolisItem = ({ title, linkText, linkHref }) => {
  return (
    <div className={`py-2.5 px-5 w-full flex hover:bg-slate-100`}>
      <div className="pr-4 flex-1">
        <div className="font-bold">{title}</div>
        <div className="text-ottoBlue-200 hover:underline">
          <a href={linkHref} target="_blank" rel="noreferrer">
            {linkText}
          </a>
        </div>
      </div>
      <div>
        <Icon type="PdfIcon" />
      </div>
    </div>
  );
};

PolisItem.propTypes = {
  title: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  margin: PropTypes.bool,
};

const PolisFile = () => {
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
                {convertRawDate(item.startDate)}
              </div>
              <PolisItem
                title={`Tanda Bukti Transaksi ${item.transcation.name}`}
                linkText={item.transcation.fileName}
                linkHref={item.transcation.file}
                margin
              />
              <PolisItem
                title={`Sertifikat Asuransi`}
                linkText={item.certificate.fileName}
                linkHref={`https://aktiva-relay.ap-south-1.linodeobjects.com/public/e0eb0a77-01d6-4385-86ca-ca26d09b7f44/NPWP-PT%20Aktiva%20Kreasi%20Investama.pdf`}
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
        <PolisFile />
        <PolisOwner />
        <InsuranceProvider />
      </div>
    </div>
  );
}

PolisAccordion.propTypes = {
  title: PropTypes.string,
};
