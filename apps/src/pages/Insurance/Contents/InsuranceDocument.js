/* eslint-disable */
import { PolisAccordion } from "components";
import InsurancePage from "../InsuranceWrapper";
import { useSelector } from "react-redux";

export default function InsuranceDocument() {
  const plans = useSelector(({ insurancePlans }) => insurancePlans.plans);
  return (
    <InsurancePage>
      <div className="p-5">
        <div className="p-2.5 mb-16">
          <PolisAccordion
            title="MY_CI_Protection_QRIS"
            polisData={plans && plans.active}
          />
          <PolisAccordion
            title="Inactive MY_CI_Protection_QRIS"
            polisData={plans && plans.inactive}
            inactive
          />
        </div>
      </div>
    </InsurancePage>
  );
}
