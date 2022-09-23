// import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PropTypes from "prop-types";
import InsuranceTab from "./InsuranceTab";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { useState } from "react";
import InsuranceProduct from "./InsuranceProduct";
import InsurancePolis from "./InsurancePolis";
import style from "./InsuranceDetail.module.scss";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Icon from "../../components/Icon/Icon";

const ContactBox = ({ type = "phone", contact, link }) => {
  let typeName = "Telepon";
  let icon = "Phone";
  let typeLink = "tel:";
  let target = "";
  if (type === "email") {
    typeName = "Email";
    icon = "Email";
    typeLink = "mailto:";
  } else if (type === "web") {
    typeName = "Website";
    icon = "Web";
    typeLink = "";
    target = "_blank";
  } else if (type === "address") {
    typeName = "Alamat";
    icon = "Home";
    typeLink = "";
    target = "_blank";
  }

  return (
    <div className="rounded-xl p-4 mb-4 border border-ottoGrey-700 flex items-start">
      <div className="mr-2">
        <Icon type={icon} />
      </div>
      <div className="flex-1">
        <div className="font-bold">{typeName}</div>
        <a
          target={target}
          href={`${typeLink}${link || contact}`}
          className="text-sm text-ottoBlue-200 hover:underline"
        >
          {contact}
        </a>
      </div>
    </div>
  );
};

ContactBox.propTypes = {
  type: PropTypes.string,
  contact: PropTypes.string,
  link: PropTypes.string,
};

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
      <Button large classExtend="normal-case" onClick={onClick}>
        {text}
      </Button>
      <Modal isOpen={isOpen} onClose={close} title="PT Equity Life">
        <ContactBox contact="1500-079" />
        <ContactBox type="email" contact="contact.center@equity.id" />
        <ContactBox type="web" contact="https://equity.co.id" />
        <ContactBox
          type="address"
          contact="PT Equity Life Indonesia, Sahid Sudirman Center lantai 43 Jl. Jend Sudirman No. 86, Jakarta 10220"
          link="https://goo.gl/maps/Dwk9dG9fvVxmWt647"
        />
      </Modal>
    </>
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
