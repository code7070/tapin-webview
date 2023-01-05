import PropTypes from "prop-types";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Loading, Icon } from "components";
import style from "./PolisAccordion.module.scss";
// import { downloadFile } from "api";
import { useState } from "react";
import { v4 } from "uuid";
import download from "downloadjs";

const PolisItem = ({ title, linkText, linkHref, inactive }) => {
  const [loading, setLoading] = useState(false);

  const params = parse(window.location.search);

  const offClass = inactive ? style.inactive : "";
  const fname = `${offClass} ${style.polisFileName}`;
  const flink = `${offClass} ${style.polisFileLink}`;
  const iconType = `PdfIcon${inactive ? "Disabled" : ""}`;

  const classPolis = `${style.polisFileWord} ${inactive ? style.inactive : ""}`;

  const clickFile = async () => {
    if (linkHref && !inactive) {
      setLoading(true);
      // await downloadFile({ fileName: linkHref });
      const fileName = `fileName=${encodeURIComponent(linkHref)}`;
      const url = `https://weekend-dev.ottodigital.id/apii/v1/gcs/downloadFile?${fileName}`;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorizaion: `Bearer ${params.accessToken}`,
          "X-TRACE-ID": v4(),
        },
      })
        .then((resp) => {
          console.log("resp DONE: ", resp);
          if (resp.status === 200) return resp.blob();
          return alert(`Error ${resp.status}: ${resp.statusText}`);
        })
        .then((blob) => {
          download(blob, `${linkHref}.pdf`.replace("./", ""));
        })
        .catch(() => setLoading(false))
        .then(() => setLoading(false));
      // setLoading(false);
    }
  };

  return (
    <div className={style.polisFileItem}>
      <button className={classPolis} onClick={clickFile}>
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
      {polis.map((item) => {
        // const isLast = index === polis.length - 1;
        // const number = index + 1;
        let polisDate = item.coverageStartDate;
        let formatDate = "dd/MM/yyy - H:mm";
        if (inactive) {
          polisDate = item.coverageEndDate;
          formatDate = "dd/MM/yyy";
        }
        return (
          <div key={item.coverageStartDate} className={style.polisFileGroup}>
            <div className={style.polisTransactionDate}>
              {format(new Date(polisDate), formatDate)}
            </div>
            <PolisItem
              title="Tanda Bukti Transaksi"
              linkText={`${item.transactionProof}`.replace("./", "")}
              linkHref={item.transactionProof}
              margin
              inactive={inactive || !item.transactionProof}
            />
            <PolisItem
              title="Sertifikat Asuransi"
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
