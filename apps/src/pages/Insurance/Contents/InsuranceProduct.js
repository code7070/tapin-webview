import { ErrorBox } from "components";
import { parse } from "query-string";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocation } from "react-router-dom";
import InsurancePage from "../InsuranceWrapper";
import InsuranceCI from "./InsuranceCI";

const insuranceMapping = [
  {
    id: 1,
    content: <InsuranceCI />,
  },
];

export default function InsuranceProduct() {
  const [product, setProduct] = useState(
    <Skeleton height={200} width="100%" count={2} />
  );
  const { search } = useLocation();
  const parsed = parse(search);

  useEffect(() => {
    const found = insuranceMapping.find(
      (item) => item.id === parseInt(parsed.insuranceId, 10)
    );
    let view;
    if (found) view = found.content;
    else
      view = (
        <ErrorBox
          title="Insurance Not Found"
          subtitle="Insurance target is not found"
        />
      );
    setProduct(view);
  }, [parsed.insuranceId]);

  return <InsurancePage>{product}</InsurancePage>;
}
