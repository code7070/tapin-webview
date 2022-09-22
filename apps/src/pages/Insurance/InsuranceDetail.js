// import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PropTypes from "prop-types";
import InsuranceTab from "./InsuranceTab";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import InsuranceProduct from "./InsuranceProduct";
import InsurancePolis from "./InsurancePolis";
import style from "./InsuranceDetail.module.scss";
import Button from "../../components/Button/Button";

const ClickToAction = ({ tab }) => {
  let text = "Beli Asuransi";
  if (tab === "dokumen") text = "Hubungi / Klaim";
  return (
    <Button large classExtend="normal-case">
      {text}
    </Button>
  );
};

ClickToAction.propTypes = {
  tab: PropTypes.string,
};

export default function InsuranceDetail() {
  // const [shadow, setShadow] = useState("-3px 30px");

  const { search } = useLocation();
  const { tab } = parse(search);

  // useEffect(() => {
  //   let hasScrollbar =
  //     window.innerHeight > document.documentElement.clientHeight;
  //   console.log({ hasScrollbar });

  //   if (hasScrollbar) setShadow("-3px 30px");
  //   else setShadow("0px 0px");
  //   window.addEventListener("scroll", () => {
  //     console.log({ hasScrollbar });
  //     const { innerHeight, scrollY } = window;
  //     const logic = innerHeight + scrollY >= document.body.offsetHeight;

  //     if (logic) setShadow("0px 0px");
  //     else setShadow("-3px 30px");
  //   });
  // }, [search]);

  console.log(tab);

  let view = <InsuranceProduct />;
  if (tab === "dokumen") view = <InsurancePolis />;

  return (
    <section className={style.insuranceDetail}>
      <Header title="My Critical Illness Protection" />
      <div className="max-w-lg mx-auto pb-28">
        <InsuranceTab />
        {view}
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
        <ClickToAction tab={tab} />
      </div>
    </section>
  );
}
