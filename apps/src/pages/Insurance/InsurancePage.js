import { useLocation } from "react-router-dom";
import { Header } from "components";
import style from "./InsurancePage.module.scss";
import { propTypesChildren } from "helpers/util";
import { ClickToAction, InsuranceProvider, Tab } from "./InsuranceSection";
import useInsurancePlans from "hooks/useInsurancePlans";

export default function InsurancePage({ children }) {
  const { pathname: path } = useLocation();
  useInsurancePlans();
  let activeTab = "detail";
  if (path.includes("/dokumen")) activeTab = "dokumen";

  return (
    <section className={style.insuranceDetail}>
      <Header title="My Critical Illness Protection" />
      <div className="max-w-lg mx-auto pb-28">
        <Tab />
        {children}
        <InsuranceProvider />
      </div>
      <div className={style.ctaWrapper}>
        <ClickToAction tab={activeTab} />
      </div>
    </section>
  );
}

InsurancePage.propTypes = {
  children: propTypesChildren,
};
