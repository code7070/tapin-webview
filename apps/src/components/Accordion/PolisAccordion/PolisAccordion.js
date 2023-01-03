import PropTypes from "prop-types";
import { useState } from "react";
import PolisGraph from "./PolisAccordionGraph";
import style from "./PolisAccordion.module.scss";
import { PolisOwner, PolisProvider, PolisTitle } from "./PolisAccordionViews";
import PolisFile from "./PolisFile";
import Skeleton from "react-loading-skeleton";

export default function PolisAccordion({
  title = "Title",
  inactive = false,
  polisData,
}) {
  const [isOpen, setOpen] = useState(false);

  const noPolis = !polisData || polisData.length < 1;
  if (!polisData) return <Skeleton width="100%" height={64} />;
  else if (noPolis) return "";

  const toggle = () => setOpen(!isOpen);

  const classOpen = isOpen ? style.open : "";

  const arrPolis = polisData ? polisData.slice(0, 3) : [];

  return (
    <div className={`${style.polisAccordion} ${classOpen}`}>
      <PolisTitle
        loading={noPolis}
        onClick={toggle}
        isOpen={isOpen}
        title={title}
      />
      <div className={style.content}>
        <PolisGraph polisData={arrPolis} inactive={inactive} isOpen={isOpen} />
        <PolisFile polisData={arrPolis} inactive={inactive} />
        <PolisOwner />
        <PolisProvider />
      </div>
    </div>
  );
}

PolisAccordion.propTypes = {
  title: PropTypes.string,
  inactive: PropTypes.bool,
  polisData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};
