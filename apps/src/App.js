import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";
import "./scss/global.scss";

const Test = lazy(() => import("./pages/Test/Test"));
const Document = lazy(() =>
  import("./pages/Insurance/InsuranceContent.js/InsuranceDocument")
);
const Product = lazy(() =>
  import("./pages/Insurance/InsuranceContent.js/InsuranceProduct")
);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/">
            <Route index element={<Test />} />
            <Route path="insurance">
              <Route
                index
                element={
                  <Navigate replace to={`detail${window.location.search}`} />
                }
              />
              <Route path="detail" element={<Product />} />
              <Route path="dokumen" element={<Document />} />
              <Route
                path="*"
                element={
                  <Navigate replace to={`detail${window.location.search}`} />
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  </Provider>
);

export default App;
