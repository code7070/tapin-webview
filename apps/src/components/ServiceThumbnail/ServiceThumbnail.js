import PropTypes from "prop-types";

export default function ServiceThumbnail({
  name = "Gadget",
  company = "OTTO",
  minPrice = "1000",
  icon,
}) {
  return (
    <div className="serviceThumbnail rounded-lg bg-white p-5">
      <div className="flex">
        <div>
          <div>{name}</div>
          <div>{company}</div>
          <div>{`Mulai dari ${minPrice}`}</div>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}

ServiceThumbnail.propTypes = {
  name: PropTypes.string,
  company: PropTypes.company,
  minPrice: PropTypes.number,
  icon: PropTypes.string,
};
