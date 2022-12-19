import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { insurancePlanList } from "../../api/dummy";
import PolisAccordion from "../../components/Accordion/PolisAccordion/PolisAccordion";
import InsurancePage from "./InsurancePage";

/* eslint-disable no-unused-vars */

export default function InsuranceDocument() {
  const [polis, setPolis] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPolis(insurancePlanList);
    }, 500);
  }, []);

  const planList = polis && polis.insurancePlans;
  const isPolisExist = polis && planList && planList.length > 0;

  return (
    <InsurancePage>
      <div className="p-5">
        <div className="p-2.5 mb-16">
          {isPolisExist ? (
            <>
              <PolisAccordion
                title={
                  (polis && planList[planList.length - 1].insurancePolis) || ""
                }
                polisData={polis && planList}
              />
              <PolisAccordion
                title="Inactive Insurance"
                polisData={polis && planList}
                inactive
              />
            </>
          ) : (
            <Skeleton height={64} count={2} width="100%" />
          )}
        </div>
      </div>
    </InsurancePage>
  );
}
