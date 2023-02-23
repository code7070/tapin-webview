import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { Modal, Icon } from "components";
import { detectDevice, isAppleDevice } from "helpers/util";
import eliContact from "helpers/eli-contact";

const ContactBox = ({ name, icon, linkText, linkHref }) => {
  return (
    <div className="rounded-xl p-4 mb-4 border border-ottoGrey-700 flex items-start">
      <div className="mr-2">
        <Icon type={icon} />
      </div>
      <div className="flex-1">
        <div className="font-bold">{name}</div>
        <a
          target="_blank"
          rel="noreferrer"
          href={linkHref}
          className="text-sm text-ottoBlue-200 hover:underline tracking-wide break-words"
        >
          {linkText || linkHref}
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
  const { search } = useLocation();
  const { device = "unlisted" } = parse(search);

  let deviceType = `${detectDevice(device)}`.toLowerCase();

  const addressLink = eliContact.address[deviceType];
  const ogLink = eliContact.site;
  const linkEquity = `${isAppleDevice() ? "web:" : ""}${ogLink}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="PT Equity Life">
      {/* <div className="mb-8 text-center">Device: {deviceType}</div> */}
      <ContactBox
        name="Telepon"
        icon="Phone"
        linkHref="tel:1500-709"
        linkText="1500-709"
      />
      <ContactBox
        name="Email"
        icon="Email"
        linkHref={`mailto:${eliContact.mail}`}
        linkText={eliContact.mail}
      />
      <ContactBox
        name="Website"
        icon="Web"
        linkText={eliContact.siteText}
        linkHref={linkEquity}
      />
      <ContactBox
        name="Alamat"
        icon="Home"
        linkHref={addressLink}
        linkText={eliContact.addressText}
      />
    </Modal>
  );
}

PopupContact.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
