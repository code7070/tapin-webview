/* eslint-disable */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Icon } from "components";
import style from "./Header.module.scss";
import { useCallback, useEffect } from "react";
import { isAndroid } from "helpers/util";

export default function Header({ title = "Header Title" }) {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    // check route history length
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      toast("Closing WebView...");

      if (isAndroid) {
        nativeDo.closeWebView();

        // suggested function
        window.InterfaceObject.nativeDo({ command: "closeWebView", data: {} });
      } else
        webkit.messageHandlers.nativeDo.postMessage({
          command: "closeWebView",
          data: {},
        });
    }
  }, [navigate]);

  useEffect(() => {
    // install native back function same as back function
    window.nativeBackPressed = onBack;

    return () => {
      window.nativeBackPressed = null;
    };
  }, [onBack]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 w-full bg-white flex items-center px-5 py-2.5 ${style.header}`}
      >
        <Button classExtend="btn-ghost btn-circle" onClick={onBack}>
          <Icon type="ArrowLeft" />
        </Button>
        <div
          className="flex-1 justify-center text-center text-lg font-semibold text-ottoGrey-100 line-clamp-1"
          title={title}
        >
          {title}
        </div>
      </div>
      <ToastContainer
        className="otToast"
        progressClassName="otToast-progress"
        position="bottom-center"
        closeButton={false}
        autoClose={600000}
      />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
