import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { Modal, Icon } from "components";
import { detectBrowser } from "helpers/util";

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

const linkAddress = {
  unlisted: "https://goo.gl/maps/EZ5kbEMzgpKgZjYF7",
  android: "https://goo.gl/maps/EZ5kbEMzgpKgZjYF7",
  ios: "maps://?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
  apple:
    "maps://?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
  mac: "maps://?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
  ipad: "maps://?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
  iphone:
    "maps://?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
  appleMaps:
    "https://maps.apple.com/?address=Jl.%20Jend.%20Sudirman%20No.%2086,%20Central%20Jakarta,%20Jakarta%2010220,%20Indonesia&auid=6459330042965116742&ll=-6.210914,106.818670&lsp=9902$t=m",
};

export default function PopupContact({ isOpen = true, onClose = () => {} }) {
  const { search } = useLocation();
  const { device = "unlisted" } = parse(search);

  let deviceType = `${detectBrowser(device)}`.toLowerCase();
  // console.log({ deviceType });
  const addressLink = linkAddress[deviceType];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="PT Equity Life">
      <div className="mb-8 text-center">Device: {deviceType}</div>
      <ContactBox
        name="Telepon"
        icon="Phone"
        linkHref="tel:1500-709"
        linkText="1500-709"
      />
      <ContactBox
        name="Email"
        icon="Email"
        linkHref="mailto:contact.center@equity.id"
        linkText="contact.center@equity.id"
      />
      <ContactBox name="Website" icon="Web" linkHref="https://equity.co.id" />
      <ContactBox
        name="Alamat"
        icon="Home"
        linkHref={addressLink}
        linkText="PT Equity Life Indonesia, Sahid Sudirman Center lantai 43 Jl. Jend Sudirman No. 86, Jakarta 10220"
      />
    </Modal>
  );
}

PopupContact.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
