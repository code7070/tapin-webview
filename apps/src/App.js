import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";
import "./scss/global.scss";
import Skeleton from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";

const Document = lazy(() =>
  import("pages/Insurance/Contents/InsuranceDocument")
);
const Product = lazy(() => import("pages/Insurance/Contents/InsuranceProduct"));

const PageSkeleton = () => (
  <div className="max-w-md mx-auto">
    <div className="px-2">
      <div className="flex">
        <div className="mr-2 flex-1">
          <Skeleton height={68} />
        </div>
        <div className="ml-2 flex-1">
          <Skeleton height={68} />
        </div>
      </div>
      <div className="p-2">
        <Skeleton height={200} count={3} />
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Navigate
                    replace
                    to={`insurance?${window.location.search}`}
                  />
                }
              />
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
      <ToastContainer
        className="otToast"
        progressClassName="otToast-progress"
        position="bottom-center"
        closeButton={false}
        autoClose={3000}
      />
    </Provider>
  );
};

export default App;
