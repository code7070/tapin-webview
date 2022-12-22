import { createSlice } from "@reduxjs/toolkit";

const insurancePlansReducer = createSlice({
  name: "insurancePlans",
  initialState: {
    plans: {
      active: false,
      inactive: false,
    },
  },
  reducers: {
    setActive: (state, action) => {
      state.plans.active = action.payload;
    },
    setInactive: (state, action) => {
      state.plans.inactive = action.payload;
    },
    setInsurancePlans: (state, { payload }) => {
      state.plans = { active: payload.active, inactive: payload.inactive };
    },
  },
});

export const {
  setActive: setInsurancePlansActive,
  setInactive: setInsurancePlansInactive,
  setInsurancePlans,
} = insurancePlansReducer.actions;
export default insurancePlansReducer.reducer;
