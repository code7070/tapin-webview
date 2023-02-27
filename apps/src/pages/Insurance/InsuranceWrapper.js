import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ErrorBox, Header } from "components";
import style from "./InsuranceWrapper.module.scss";
import { getAccessToken, outProd, propTypesChildren } from "helpers/util";
import { ClickToAction, InsuranceProvider, Tab } from "./Sections";
import useInsurancePlans from "hooks/useInsurancePlans";
import { parse } from "query-string";
import JSONPretty from "react-json-pretty";
import theme from "react-json-pretty/dist/monikai";

const InsuranceContent = ({ children, activeTab }) => {
  const dataset = useInsurancePlans();

  return (
    <>
      <div className="max-w-lg mx-auto pb-28">
        {outProd && (
          <div>
            <div className="flex max-w-full">
              <div className="w-1/3">Token</div>
              <div className="w-2/3 text-sm">
                {JSON.stringify(getAccessToken())}
              </div>
            </div>
            <div className="flex max-w-lg max-h-[400px] overflow-y-auto">
              <div className="w-1/3">API</div>
              <div className="w-2/3 text-sm">
                <JSONPretty theme={theme} data={dataset} />
              </div>
            </div>
          </div>
        )}
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
