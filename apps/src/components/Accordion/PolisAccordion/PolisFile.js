import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Loading, Icon } from "components";
import style from "./PolisAccordion.module.scss";
import { downloadFile } from "api";
import { useState } from "react";

const PolisItem = ({ title, linkText, linkHref, inactive }) => {
  const [loading, setLoading] = useState(false);

  const offClass = inactive ? style.inactive : "";
  const fname = `${offClass} ${style.polisFileName}`;
  const flink = `${offClass} ${style.polisFileLink}`;
  const iconType = `PdfIcon${inactive ? "Disabled" : ""}`;

  const clickFile = async () => {
    setLoading(true);
    await downloadFile({ fileName: linkHref });
    setLoading(false);
  };

  return (
    <div className={style.polisFileItem}>
      <button className={style.polisFileWord} onClick={clickFile}>
        <div className={fname}>{title}</div>
        {loading ? <Loading /> : <div className={flink}>{linkText}</div>}
      </button>
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
        // const isLast = index === polis.length - 1;
        const number = index + 1;
        return (
          <div key={item.coverageStartDate} className={style.polisFileGroup}>
            <div className={style.polisTransactionDate}>
              {format(new Date(item.coverageStartDate), "dd/MM/yyy - H:mm")}
            </div>
            <PolisItem
              title={`Tanda Bukti Transaksi ${number}`}
              linkText={`${item.transactionProof}`.replace("./", "")}
              linkHref={item.transactionProof}
              margin
              inactive={inactive || !item.transactionProof}
            />
            <PolisItem
              title={`Sertifikat Asuransi ${number}`}
              linkText={item.certificateCertificate}
              linkHref={item.insuranceCertificate}
              inactive={inactive || !item.insuranceCertificate}
            />
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
