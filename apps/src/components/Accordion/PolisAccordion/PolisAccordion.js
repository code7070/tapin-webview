import PropTypes from "prop-types";
import { useState } from "react";
import PolisGraph from "./PolisAccordionGraph";
import style from "./PolisAccordion.module.scss";
import { PolisOwner, PolisProvider, PolisTitle } from "./PolisAccordionViews";
import PolisFile from "./PolisFile";

export default function PolisAccordion({
  title = "Title",
  inactive = false,
  polisData,
}) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const tailwind = `rounded-md border border-ottoGrey-500 mb-4`;
  const classOpen = isOpen ? style.open : "";

  return (
    <div className={`${style.polisAccordion} ${classOpen} ${tailwind}`}>
      <PolisTitle
        loading={polisData === false}
        onClick={toggle}
        isOpen={isOpen}
        title={title}
      />
      <div className={style.content}>
        <PolisGraph
          inactive={inactive}
          polisData={polisData || []}
          isOpen={isOpen}
        />
        <PolisFile polisData={polisData || []} inactive={inactive} />
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
