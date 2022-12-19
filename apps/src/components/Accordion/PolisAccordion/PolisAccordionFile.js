import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import Icon from "components/Icon/Icon";
import style from "./PolisAccordion.module.scss";

const PolisItem = ({ title, linkText, linkHref, inactive }) => {
  const offClass = inactive ? style.inactive : "";
  const fname = `${offClass} ${style.polisFileName}`;
  const flink = `${offClass} ${style.polisFileLink}`;
  const iconType = `PdfIcon${inactive ? "Disabled" : ""}`;

  return (
    <div className={style.polisFileItem}>
      <div className={style.polisFileWord}>
        <div className={fname}>{title}</div>
        <a href={linkHref} target="_blank" rel="noreferrer" className={flink}>
          {linkText}
        </a>
      </div>
      <div className="w-1/12">
        <Icon type={iconType} />
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
              <div className={style.polisTransactionDate}>
                {format(new Date(item.coverageStart), "dd/MM/yyy - H:mm")}
              </div>
              <PolisItem
                title={`Tanda Bukti Transaksi ${number}`}
                linkText={item.transcationProof}
                linkHref={item.transcationProof}
                margin
                inactive={inactive}
              />
              <PolisItem
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
