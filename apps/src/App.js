import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/global.scss";

const Test = lazy(() => import("./pages/Test/Test"));
const InsuranceList = lazy(() => import("./pages/Insurance/InsuranceList"));
const InsurancePage = lazy(() => import("./pages/Insurance/InsurancePage"));
const Document = lazy(() => import("./pages/Insurance/InsuranceDocument"));
const Product = lazy(() => import("./pages/Insurance/InsuranceProduct"));

const App = () => (
  <div className="App">
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          <Route index element={<Test />} />
          <Route path="insurance">
            <Route path="list" element={<InsuranceList />} />
            <Route path=":id">
              <Route
                path="detail"
                element={
                  <InsurancePage>
                    <Product />
                  </InsurancePage>
                }
              />
              <Route
                path="dokumen"
                element={
                  <InsurancePage>
                    <Document />
                  </InsurancePage>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </div>
);

export default App;
