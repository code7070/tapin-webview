import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { insurancePlanList } from "api/dummy";
import { differenceInDays as diffDays } from "date-fns";
import { setInsurancePlans as setPlans } from "pages/Insurance/insurancePlansSlice";
import { getInsurancePlans } from "api";
import { useLocation, useNavigate } from "react-router-dom";
import { parse } from "query-string";
import { inDev } from "helpers/util";

function useInsurancePlans() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [resAPI, setRes] = useState(false);
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
      dispatch(setPlans({ active, inactive }));
    };

    const hit = async () => {
      if (inDev) console.log("Hit insurance plans...");
      const res = await getInsurancePlans({
        id: parsed.customerId || "943f9bd0-7484-4af2-82ca-68f09b3dbd5b",
        insuranceId: parsed.insuranceId || "1",
      });
      if (res && res.insurancePlan) processing(res.insurancePlan);
      else {
        navigate(`/insurance/detail${window.location.search}`, {
          replace: true,
        });
        dispatch(setPlans({ active: [], inactive: [], meta: res.meta }));
      }
      setRes(res);
      if (inDev) console.log("Return plans: ", res);
    };
    if (!parsed.customerId || !parsed.insuranceId) {
      dispatch(setPlans({ active: [], inactive: [] }));
      alert("Customer or Insurance information required");
    } else if (!plans.active && !plans.inactive) hit();
  }, [parsed.customerId, parsed.insuranceId, dispatch, plans, navigate]);

  return resAPI;
}

export default useInsurancePlans;
