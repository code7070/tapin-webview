import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insurancePlanList } from "api/dummy";
import { differenceInDays as diffDays } from "date-fns";
import { setInsurancePlans } from "pages/Insurance/insurancePlansSlice";
import { getInsurancePlans } from "api";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";

function useInsurancePlans() {
  const { search } = useLocation();
  const parsed = parse(search);
  const plans = useSelector(({ insurancePlans }) => insurancePlans.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    const hit = async () => {
      console.log("Hit insurance plans...");
      const { data, error } = await getInsurancePlans({
        id: parsed.costumerId || "943f9bd0-7484-4af2-82ca-68f09b3dbd5b",
        insuranceId: parsed.insuranceId || "1",
      });
      console.log("Return Insurance Plans: ", data, error);
    };

    hit();
  }, [parsed.costumerId, parsed.insuranceId]);

  useEffect(() => {
    const polis = insurancePlanList;
    const hasData = polis && polis.insurancePlans;
    if (hasData && !plans.active && !plans.inactive) {
      const list = polis.insurancePlans;
      const now = new Date();
      const active = [];
      const inactive = [];
      list.map((item) => {
        const target = item.coverageEnd;
        const diff = diffDays(now, new Date(target));
        if (diff > -1) inactive.push(item);
        else active.push(item);
      });

      setTimeout(() => {
        dispatch(setInsurancePlans({ active, inactive }));
      }, 1500);
    }
  }, [dispatch, plans]);

  return "";
}

export default useInsurancePlans;
