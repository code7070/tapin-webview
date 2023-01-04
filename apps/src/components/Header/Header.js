import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "components";
import style from "./Header.module.scss";

export default function Header({ title = "Header Title" }) {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
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
  );
}

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
