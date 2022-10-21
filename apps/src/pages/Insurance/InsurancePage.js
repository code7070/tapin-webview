import Header from "../../components/Header/Header";
import PropTypes from "prop-types";
import InsuranceTab from "./InsuranceTab";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import style from "./InsurancePage.module.scss";
import Button from "../../components/Button/Button";
import PopupContact from "./PopupContact";
import { propTypesChildren } from "../../helpers/util";

const ClickToAction = ({ tab }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  let text = "Beli Asuransi";
  let onClick = () => alert("Beli Asuransi!");
  if (tab === "dokumen") {
    text = "Hubungi / Klaim";
    onClick = () => open();
  }

  return (
    <>
      <Button large onClick={onClick}>
        {text}
      </Button>
      <PopupContact isOpen={isOpen} onClose={close} />
    </>
  );
};

ClickToAction.propTypes = {
  tab: PropTypes.string,
};

export default function InsurancePage({ children }) {
  const { pathname: path } = useLocation();

  let activeTab = "detail";
  if (path.includes("/dokumen")) activeTab = "dokumen";

  return (
    <section className={style.insuranceDetail}>
      <Header title="My Critical Illness Protection" />
      <div className="max-w-lg mx-auto pb-28">
        <InsuranceTab />
        {children}
        <div className="px-5">
          <div className="info-text">
            *Produk dan jasa keuangan formal ditawarkan oleh lembaga jasa
            keuangan formal yang memiliki izin, diatur, dan diawasi oleh
            Otoritas Jasa Keuangan (OJK).
          </div>
          <div>
            <div className="body-text small">Penyedia</div>
            <div className="logo-cermati">
              <img alt="Cermati Logo" src="/assets/cermati-logo.jpg" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 w-full flex items-center justify-center p-5 bg-white"
        style={{
          boxShadow: `0 0px 0px rgba(0, 0, 0, 0.1)`,
          transition: "0.15s ease-in-out",
        }}
      >
        <ClickToAction tab={activeTab} />
      </div>
    </section>
  );
}

InsurancePage.propTypes = {
  children: propTypesChildren,
};
