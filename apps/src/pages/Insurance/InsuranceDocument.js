/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { insurancePlanList } from "api/dummy";
import { PolisAccordion } from "components";
import InsurancePage from "./InsurancePage";

export default function InsuranceDocument() {
  const [polis, setPolis] = useState(false);

  const [activePolis, setActivePolis] = useState(false);
  const [inactivePolis, setInactivePolis] = useState(false);

  useEffect(() => {
    setTimeout(setPolis, 500, insurancePlanList);
  }, []);

  useEffect(() => {
    if (polis && polis.insurancePlans) {
      const list = polis.insurancePlans;
      const now = new Date();
      list.map((item) => {
        const target = item.coverageEnd;
        // console.log(
        //   "List Map: ",
        //   new Date(target),
        //   diffDays(new Date(target), now)
        // );
      });
    }
  }, [polis]);

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
