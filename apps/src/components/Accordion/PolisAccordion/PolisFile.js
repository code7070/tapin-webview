/* eslint-disable */
import PropTypes from "prop-types";
import download from "downloadjs";
import { parse } from "query-string";
import { useLocation } from "react-router-dom";
import { format, subDays } from "date-fns";
import { Loading, Icon } from "components";
import style from "./PolisAccordion.module.scss";
// import { downloadFile } from "api";
import { useState } from "react";
import { v4 } from "uuid";

const PolisItem = ({ title, linkText, linkHref, inactive }) => {
  const [loading, setLoading] = useState(false);

  const params = parse(window.location.search);

  const offClass = inactive ? style.inactive : "";
  const fname = `${offClass} ${style.polisFileName}`;
  const flink = `${offClass} ${style.polisFileLink}`;
  const iconType = `PdfIcon${inactive ? "Disabled" : ""}`;

  const classPolis = `${style.polisFileWord} ${inactive ? style.inactive : ""}`;

  const fileName = `${linkText}`.replace("./");
  const displayName = fileName.split("/");

  const clickFile = async () => {
    if (linkHref && !inactive) {
      setLoading(true);
      const fileName = `fileName=${linkHref}`;
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
          const blobSave = (fileName = "") => {
            try {
              const arr = new Uint8Array(resp);
              const blob = new Blob([arr], { type: "application/pdf" });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", fileName);
              document.body.appendChild(link);
              console.log("Downloading: ", fileName);
              link.click();
              link.remove();
              setLoading(false);
            } catch (e) {
              console.error("Failed to generate document: ", e);
            }
          };

          blobSave(displayName.join("-"));
        })
        // .then(function (resp) {
        //   return new Blob(['{"name": "test"}']);
        // })
        // .then(function (blob) {
        //   const name = `${linkHref}`.replace("./", "");
        //   download(blob, name, "application/pdf");
        //   setLoading(false);
        // })
        .catch(() => setLoading(false));
      // setLoading(false);
    }
  };

  return (
    <div className={style.polisFileItem}>
      {/* <a
        href={linkHref}
        target="_blank"
        className="block w-full"
        rel="noreferrer noopener"
      > */}
      <button className={classPolis} onClick={clickFile} disabled={loading}>
        <div className={fname}>{title}</div>
        <div className={flink}>{displayName[displayName.length - 1]}</div>
      </button>
      {/* </a> */}
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
          console.log("Inactive polis: ", item);
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
              linkHref={item.transactionProof}
              margin
              inactive={inactive || !item.transactionProof}
            />
            <PolisItem
              title="Sertifikat Asuransi"
              linkText={item.certificateCertificate || ""}
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
