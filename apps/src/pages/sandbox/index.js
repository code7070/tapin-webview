import { Button } from "components";
import { useState } from "react";

export default function FormSandbox() {
  const [insId, setInsId] = useState(1);
  const [custId, setCustId] = useState(170);

  const changeIns = (e) => setInsId(e.target.value || "");
  const changeCust = (e) => setCustId(e.target.value || "");

  const url = "https://weekend-dev.ottodigital.id/insurance/dokumen";
  const params = `customerId=${custId}&insuranceId=${insId}`;

  return (
    <div className="container">
      <div className="max-w-sm mx-auto">
        <div className="text-2xl font-bold mb-6">FORM SANDBOX</div>
        <form action={`${url}?${params}`} method="GET">
          <div className="form-control mb-2">
            <label className="label-text" htmlFor="token">
              USER-ACCESS-TOKEN
            </label>
            <input
              id="token"
              className="input input-bordered w-full my-2"
              name="USER-ACCESS-TOKEN"
              placeholder="Access Token"
            />
          </div>
          <div className="form-control mb-2">
            <label className="label-text" htmlFor="refToken">
              USER-REFRESH-TOKEN
            </label>
            <input
              id="refToken"
              className="input input-bordered w-full my-2"
              name="USER-REFRESH-TOKEN"
              placeholder="Refresh Token"
            />
          </div>
          <div className="form-control mb-2">
            <label className="label-text" htmlFor="id">
              Customer Id
            </label>
            <input
              id="id"
              className="input input-bordered w-full my-2"
              name="customerId"
              placeholder="customerId"
              value={custId}
              onChange={changeCust}
            />
          </div>
          <div className="form-control mb-2 disabled">
            <label className="label-text" htmlFor="insuranceId">
              Insurance ID
            </label>
            <input
              id="insuranceId"
              className="input input-bordered w-full my-2"
              name="insuranceId"
              placeholder="insuranceId"
              value={insId}
              onChange={changeIns}
              disabled
            />
          </div>
          <div className="my-4">
            <Button type="submit">Proceed</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
