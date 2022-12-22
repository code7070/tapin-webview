import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { insurancePlanList } from "api/dummy";
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
    const processing = (dataPlans = []) => {
      const now = new Date();
      const active = [];
      const inactive = [];
      dataPlans.map((item) => {
        const target = item.coverageEndDate;
        const diff = diffDays(now, new Date(target));
        if (diff > -1) inactive.push(item);
        else active.push(item);
      });
      dispatch(setInsurancePlans({ active, inactive }));
    };

    const hit = async () => {
      console.log("Hit insurance plans...");
      const res = await getInsurancePlans({
        id: parsed.customerId || "943f9bd0-7484-4af2-82ca-68f09b3dbd5b",
        insuranceId: parsed.insuranceId || "1",
      });
      if (res && res.insurancePlan) processing(res.insurancePlan);
      console.log("Return Insurance Plans: ", res);
    };
    if (!parsed.customerId || !parsed.insuranceId) {
      dispatch(setInsurancePlans({ active: [], inactive: [] }));
      alert("Customer or Insurance information required");
    } else if (!plans.active && !plans.inactive) hit();
  }, [parsed.customerId, parsed.insuranceId, dispatch, plans]);

  return "";
}

export default useInsurancePlans;
