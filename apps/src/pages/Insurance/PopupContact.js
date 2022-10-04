import PropTypes from "prop-types";
import Modal from "../../components/Modal/Modal";
import Icon from "../../components/Icon/Icon";

const ContactBox = ({ name, icon, linkText, linkHref }) => {
  return (
    <div className="rounded-xl p-4 mb-4 border border-ottoGrey-700 flex items-start">
      <div className="mr-2">
        <Icon type={icon} />
      </div>
      <div className="flex-1 break-all">
        <div className="font-bold">{name}</div>
        <a
          target="_blank"
          rel="noreferrer"
          href={linkHref}
          className="text-sm text-ottoBlue-200 hover:underline"
        >
          {linkHref || linkText}
        </a>
      </div>
    </div>
  );
};

ContactBox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
};

export default function PopupContact({ isOpen = true, onClose = () => {} }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="PT Equity Life">
      <ContactBox name="Telepon" icon="Phone" linkHref="tel:1500-709" />
      <ContactBox
        name="Email"
        icon="Email"
        linkHref="mailto:contact.center@equity.id"
      />
      <ContactBox name="Website" icon="Web" linkHref="https://equity.co.id" />
      <ContactBox
        name="Alamat - maps.google.com/?q="
        icon="Home"
        linkHref="https://maps.google.com/?q=PT+Equity+Life+Indonesia/@-6.2109142,106.8186699,17z"
      />
      <ContactBox
        name="Alamat - goo.gl/maps"
        icon="Home"
        linkHref="https://goo.gl/maps/Dwk9dG9fvVxmWt647"
      />
      <ContactBox
        name="Alamat - comgooglemaps://"
        icon="Home"
        linkHref="comgooglemaps://?q=PT+Equity+Life+Indonesia&center=@-6.2109142,106.8186699&zoom=17"
      />
      <ContactBox
        name="Alamat - maps://"
        icon="Home"
        linkHref="maps://?q=PT+Equity+Life+Indonesia&center=@-6.2109142,106.8186699&zoom=17"
      />
    </Modal>
  );
}

PopupContact.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
