import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/global.scss";

const Test = lazy(() => import("./pages/Test/Test"));
const Document = lazy(() => import("./pages/Insurance/InsuranceDocument"));
const Product = lazy(() => import("./pages/Insurance/InsuranceProduct"));

const App = () => (
  <div className="App">
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          <Route index element={<Test />} />
          <Route path="insurance">
            <Route path="ci">
              <Route path="detail" element={<Product />} />
              <Route path="dokumen" element={<Document />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </div>
);

export default App;
