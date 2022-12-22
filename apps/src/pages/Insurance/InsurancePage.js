import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Header } from "components";
import style from "./InsurancePage.module.scss";
import { propTypesChildren } from "helpers/util";
import { ClickToAction, InsuranceProvider, Tab } from "./InsuranceSection";
import useInsurancePlans from "hooks/useInsurancePlans";
import { parse } from "query-string";

const InsuranceContent = ({ children, activeTab }) => {
  useInsurancePlans();
  return (
    <>
      <div className="max-w-lg mx-auto pb-28">
        <Tab />
        {children}
        <InsuranceProvider />
      </div>
      <div className={style.ctaWrapper}>
        <ClickToAction tab={activeTab} />
      </div>
    </>
  );
};

InsuranceContent.propTypes = {
  children: propTypesChildren,
  activeTab: PropTypes.string,
};

const CredentialChecker = ({ children }) => {
  const { search } = useLocation();
  const parsed = parse(search);
  if (parsed.accessToken && parsed.customerId && parsed.insuranceId)
    return children;
  else
    return (
      <div className="text-center my-10 mx-auto p-4 max-w-[320px] rounded-lg bg-red-100 border-4 border-red-300">
        <div className="text-xl font-bold text-red-700 mb-3">
          ACCESS NOT ALLOWED
        </div>
        <div className="text-md text-red-600">
          Please complete all credential information
        </div>
      </div>
    );
};

CredentialChecker.propTypes = {
  children: propTypesChildren,
};

export default function InsurancePage({ children }) {
  const { pathname: path } = useLocation();

  let activeTab = "detail";
  if (path.includes("/dokumen")) activeTab = "dokumen";

  return (
    <section className={style.insuranceDetail}>
      <Header title="My Critical Illness Protection" />
      <CredentialChecker>
        <InsuranceContent activeTab={activeTab}>{children}</InsuranceContent>
      </CredentialChecker>
    </section>
  );
}

InsurancePage.propTypes = {
  children: propTypesChildren,
};
