/* eslint-disable */
import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format, subDays } from "date-fns";
import { Loading, Icon } from "components";
import style from "./PolisAccordion.module.scss";
// import { downloadFile } from "api";
import { useState } from "react";
import { linkCreator, webFetch } from "helpers/util";
import { toast } from "react-toastify";

const PolisItem = ({ title, linkText, inactive, id, backUrl = "" }) => {
  const [loading, setLoading] = useState(false);

  const offClass = inactive ? style.inactive : "";
  const fname = `${offClass} ${style.polisFileName}`;
  const flink = `${offClass} ${style.polisFileLink}`;
  const iconType = `PdfIcon${inactive ? "Disabled" : ""}`;

  const classPolis = `${style.polisFileWord} ${inactive ? style.inactive : ""}`;

  const fileName = `${linkText}`.replace("./", "");
  const displayName = fileName.split("/");

  const onCatch = (res) => {
    toast("Gagal mendapatkan file");
    console.log("Catch: ", res);
    setLoading(false);
  };

  const clickFile = async () => {
    if (id && backUrl && !inactive) {
      setLoading(true);
      // const params = `fileName=${fileName}`;
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const uri = `${baseUrl}/ottobiz-insurance/v1/insurancePlans/${id}/${backUrl}`;
      const fetchFile = await webFetch(uri, onCatch);
      alert(JSON.stringify(fetchFile));
      const fileUrl = fetchFile[backUrl].fileUrl[0];
      console.log("Fetched: ", { fetchFile, fileUrl });
      setLoading(false);
      linkCreator(fileUrl);
    }
  };

  return (
    <div className={style.polisFileItem}>
      <button className={classPolis} onClick={clickFile} disabled={loading}>
        <div className={fname}>{title}</div>
        <div className={flink}>{displayName[displayName.length - 1]}</div>
      </button>
      <div className="w-1/12">
        {loading ? <Loading /> : <Icon type={iconType} />}
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
      {polis.map((item) => {
        // const isLast = index === polis.length - 1;
        // const number = index + 1;
        let polisDate = new Date(item.coverageStartDate);
        let formatDate = "dd/MM/yyy - H:mm";
        let wording = "";
        if (inactive) {
          polisDate = subDays(new Date(item.coverageEndDate), 1);
          formatDate = "dd/MM/yyy";
          wording = "Berlaku hingga ";
        }
        return (
          <div key={item.coverageStartDate} className={style.polisFileGroup}>
            <div className={style.polisTransactionDate}>
              {`${wording} ${format(polisDate, formatDate)}`}
            </div>
            <PolisItem
              title="Tanda Bukti Transaksi"
              linkText={`${item.transactionProof}`.replace("./", "")}
              inactive={inactive || !item.transactionProof}
              id={item.id}
              backUrl="transactionProof"
              margin
            />
            <PolisItem
              title="Sertifikat Asuransi"
              linkText={item.insuranceCertificate || ""}
              inactive={inactive || !item.insuranceCertificate}
              id={item.id}
              backUrl="insuranceCertificate"
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
