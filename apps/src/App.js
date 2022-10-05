import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/global.scss";

const Test = lazy(() => import("./pages/Test/Test"));
const InsuranceList = lazy(() => import("./pages/Insurance/InsuranceList"));
const InsuranceDetail = lazy(() => import("./pages/Insurance/InsuranceDetail"));
const Huy = lazy(() => import("./pages/Huy/Huy"));

const App = () => (
  <div className="App">
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          <Route index element={<Test />} />
          <Route path="insurance">
            <Route path="list" element={<InsuranceList />} />
            <Route path=":id" element={<InsuranceDetail />} />
          </Route>
          <Route path="huy">
            <Route index element={<Huy />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </div>
);

export default App;
