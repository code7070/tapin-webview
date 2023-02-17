import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ErrorBox, Header } from "components";
import style from "./InsuranceWrapper.module.scss";
import { propTypesChildren } from "helpers/util";
import { ClickToAction, InsuranceProvider, Tab } from "./Sections";
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
  // const token = getAccessToken()
  // const refToken = getCookie("USER-REFRESH-TOKEN")
  if (parsed.customerId && parsed.insuranceId) return children;
  else
    return (
      <ErrorBox
        title="ACCESS NOT ALLOWED"
        subtitle="Please complete all credential information"
      />
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
