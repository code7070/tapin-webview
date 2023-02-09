/* eslint-disable */
import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "components";
import PopupContact from "components/Popup/PopupContact";
import { toast } from "react-toastify";
import { isAndroid } from "helpers/util";

const ClickToAction = ({ tab }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  let text = "Beli Asuransi";
  let onClick = () => {
    toast("Beli Asuransi");

    const data = { productId: 1 };
    const nativeData = JSON.stringify({ command: "buyInsurance", data });

    if (isAndroid) {
      nativeDo.buyInsurance(data);

      // suggested function
      window.InterfaceObject.nativeDo(nativeData);
    } else {
      webkit.messageHandlers.nativeDo.postMessage(nativeData);
    }
  };
  if (tab === "dokumen") {
    text = "Hubungi / Klaim";
    onClick = () => open();
  }

  return (
    <>
      <Button large onClick={onClick}>
        {text}
      </Button>
      <PopupContact isOpen={isOpen} onClose={close} />
    </>
  );
};

ClickToAction.propTypes = {
  tab: PropTypes.string,
};
export default ClickToAction;
