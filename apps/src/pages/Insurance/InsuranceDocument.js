/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { differenceInDays as diffDays } from "date-fns";
// import Skeleton from "react-loading-skeleton";
import { insurancePlanList } from "api/dummy";
import { PolisAccordion } from "components";
import InsurancePage from "./InsurancePage";

export default function InsuranceDocument() {
  const [polis, setPolis] = useState(false);

  const [activePolis, setActivePolis] = useState(false);
  const [inactivePolis, setInactivePolis] = useState(false);

  useEffect(() => {
    setTimeout(setPolis, 5000, insurancePlanList);
  }, []);

  useEffect(() => {
    if (polis && polis.insurancePlans) {
      const list = polis.insurancePlans;
      const now = new Date();
      const active = [];
      const inactive = [];
      list.map((item) => {
        const target = item.coverageEnd;
        const diff = diffDays(now, new Date(target));
        if (diff > -1) inactive.push(item);
        else active.push(item);
        console.log(
          "List Map: ",
          new Date(target),
          diffDays(now, new Date(target))
        );
      });
      console.log({ active, inactive });
      setActivePolis(active);
      setInactivePolis(inactive);
    }
  }, [polis]);

  return (
    <InsurancePage>
      <div className="p-5">
        <div className="p-2.5 mb-16">
          <PolisAccordion
            title="MY_CI_Protection_QRIS"
            polisData={polis && activePolis}
          />
          <PolisAccordion
            title="Inactive MY_CI_Protection_QRIS"
            polisData={polis && inactivePolis}
            inactive
          />
        </div>
      </div>
    </InsurancePage>
  );
}
