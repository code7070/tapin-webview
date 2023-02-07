/* eslint-disable */
import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "components";
import PopupContact from "components/Popup/PopupContact";
import { toast } from "react-toastify";
import { isAndroid } from "helpers/util";
import { parse } from "query-string";

const ClickToAction = ({ tab }) => {
  const [isOpen, setOpen] = useState(false);
  const parsed = parse(window.location.search);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  let text = "Beli Asuransi";
  let onClick = () => {
    if (isAndroid) {
      toast("Beli Asuransi");

      // nativeDo.buyInsurance({ productId: 1 });

      // suggested function
      window.InterfaceObject.nativeDo(
        JSON.stringify({
          command: "buyInsurance",
          data: { productId: 1 },
        })
      );
    } else {
      webkit.messageHandlers.nativeDo.postMessage({
        command: "buyInsurance",
        data: { productId: 1 },
      });
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
