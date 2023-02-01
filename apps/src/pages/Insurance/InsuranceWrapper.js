import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ErrorBox, Header } from "components";
import style from "./InsuranceWrapper.module.scss";
import { getCookie, propTypesChildren } from "helpers/util";
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
  const cookieToken = getCookie("USER-ACCESS-TOKEN");
  const paramsToken = parsed.accessToken;
  const token = cookieToken || paramsToken;
  // const refToken = getCookie("USER-REFRESH-TOKEN")
  if (token && parsed.customerId && parsed.insuranceId) return children;
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
      <div className="max-w-sm text-xs mx-auto mt-3">
        COOKIES LISTS: <br />
        {JSON.stringify(document.cookie)}
      </div>
      <CredentialChecker>
        <InsuranceContent activeTab={activeTab}>{children}</InsuranceContent>
      </CredentialChecker>
    </section>
  );
}

InsurancePage.propTypes = {
  children: propTypesChildren,
};
