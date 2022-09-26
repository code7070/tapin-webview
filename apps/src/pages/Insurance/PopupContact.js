import PropTypes from "prop-types";
import Modal from "../../components/Modal/Modal";
import Icon from "../../components/Icon/Icon";

const ContactBox = ({ type = "phone", contact, link }) => {
  let typeName = "Telepon";
  let icon = "Phone";
  let typeLink = "tel:";
  let target = "";
  if (type === "email") {
    typeName = "Email";
    icon = "Email";
    typeLink = "mailto:";
  } else if (type === "web") {
    typeName = "Website";
    icon = "Web";
    typeLink = "";
    target = "_blank";
  } else if (type === "address") {
    typeName = "Alamat";
    icon = "Home";
    typeLink = "";
    target = "_blank";
  }

  return (
    <div className="rounded-xl p-4 mb-4 border border-ottoGrey-700 flex items-start">
      <div className="mr-2">
        <Icon type={icon} />
      </div>
      <div className="flex-1">
        <div className="font-bold">{typeName}</div>
        <a
          target={target}
          href={`${typeLink}${link || contact}`}
          className="text-sm text-ottoBlue-200 hover:underline"
        >
          {contact}
        </a>
      </div>
    </div>
  );
};

ContactBox.propTypes = {
  type: PropTypes.string,
  contact: PropTypes.string,
  link: PropTypes.string,
};

export default function PopupContact({ isOpen = true, onClose = () => {} }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="PT Equity Life">
      <ContactBox contact="1500-079" />
      <ContactBox type="email" contact="contact.center@equity.id" />
      <ContactBox type="web" contact="https://equity.co.id" />
      <ContactBox
        type="address"
        contact="PT Equity Life Indonesia, Sahid Sudirman Center lantai 43 Jl. Jend Sudirman No. 86, Jakarta 10220"
        link="https://goo.gl/maps/Dwk9dG9fvVxmWt647"
      />
    </Modal>
  );
}

PopupContact.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
