import { configureStore } from "@reduxjs/toolkit";
import insurancePlansSlice from "pages/Insurance/insurancePlansSlice";

export default configureStore({
  reducer: {
    insurancePlans: insurancePlansSlice,
  },
});
