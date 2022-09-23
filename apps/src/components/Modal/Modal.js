import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { runFunction } from "../../helpers/util";
import Icon from "../Icon/Icon";

export default function Modal({ isOpen = false, onClose, title, children }) {
  const [opened, setOpened] = useState(isOpen);
  const [transform, setTransform] = useState({ y: "0%", op: "0" });

  const close = () => {
    runFunction(onClose, () => setOpened(false));
  };

  useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (opened) setTransform({ y: "-50%", op: "1" });
    else setTransform({ y: "0%", op: "0" });
  }, [opened]);

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={opened}
      contentLabel={title}
      shouldCloseOnEsc
      onRequestClose={close}
      style={{
        overlay: { zIndex: "999", backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          left: "50%",
          top: "50%",
          width: "90%",
          maxWidth: "520px",
          transition: "all 0.25s ease-in-out",
          transform: `translate(-50%, ${transform.y})`,
          opacity: transform.op,
          borderRadius: "10px",
          padding: "30px 15px",
          minHeight: "580px",
          maxHeight: "calc(100vh - 100px)",
        },
      }}
    >
      {title && (
        <div className="text-ottoBlue-300 text-2xl font-bold text-center mb-6">
          {title}
        </div>
      )}
      {children}
      <button
        onClick={close}
        className="btn btn-circle btn-ghost bg-ottoGrey-500 absolute top-2.5 right-2.5"
      >
        <Icon type="CloseX" />
      </button>
    </ReactModal>
  );
}

const nodeTypes = [PropTypes.arrayOf(PropTypes.node), PropTypes.node];

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType(nodeTypes),
  title: PropTypes.oneOfType([...nodeTypes, PropTypes.string]),
  onClose: PropTypes.func,
};
