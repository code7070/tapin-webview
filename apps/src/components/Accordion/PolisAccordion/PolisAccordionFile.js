import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { convertRawDate } from "../../../helpers/util";
import Icon from "../../Icon/Icon";

const PolisAccordionItem = ({ title, linkText, linkHref, inactive }) => {
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

PolisAccordionItem.propTypes = {
  title: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  margin: PropTypes.bool,
  inactive: PropTypes.bool,
};

const PolisAccordionFile = ({ inactive, polisData }) => {
  const { search } = useLocation();
  const { polis: pPolis = 3 } = parse(search);

  const polis = [...polisData];
  polis.length = pPolis;

  return (
    <div>
      {polis.map((item, index) => {
        const isLast = index === polis.length - 1;
        const number = index + 1;
        return (
          <div key={item.coverageStart} className="pt-2.5">
            <div>
              <div className="px-5 text-xs text-ottoGrey-300">
                {convertRawDate(item.coverageStart, true, true)}
              </div>
              <PolisAccordionItem
                title={`Tanda Bukti Transaksi ${number}`}
                linkText={item.transcationProof}
                linkHref={item.transcationProof}
                margin
                inactive={inactive}
              />
              <PolisAccordionItem
                title={`Sertifikat Asuransi ${number}`}
                linkText={item.certificateCertificate}
                linkHref={item.insuranceCertificate}
                inactive={inactive}
              />
              {!isLast && (
                <div
                  className="bg-ottoGrey-500 my-2.5 relative left-[50%] h-px"
                  style={{
                    width: "calc(100% - 40px)",
                    transform: "translate(-50%, 0)",
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

PolisAccordionFile.propTypes = {
  inactive: PropTypes.bool,
  polisData: PropTypes.array,
};

export default PolisAccordionFile;
