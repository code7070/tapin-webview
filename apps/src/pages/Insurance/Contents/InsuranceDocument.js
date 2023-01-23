/* eslint-disable */
import { PolisAccordion } from "components";
import InsurancePage from "../InsuranceWrapper";
import { useSelector } from "react-redux";

export default function InsuranceDocument() {
  const plans = useSelector(({ insurancePlans }) => insurancePlans.plans);
  return (
    <InsurancePage>
      <div className="p-5">
        <div className="p-2.5 mb-16">
          <PolisAccordion
            title="MY_CI_Protection_QRIS"
            polisData={plans && plans.active}
          />
          <PolisAccordion
            title="Inactive MY_CI_Protection_QRIS"
            polisData={plans && plans.inactive}
            inactive
          />

          <div className="block my-4">
            <div>
              Signed urls:{" "}
              <a
                className="text-blue-400 underline hover:no-underline"
                download
                href="https://storage.googleapis.com/exmens/insurance/20230106041313.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=708060060306-compute%40developer.gserviceaccount.com%2F20230123%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230123T093847Z&X-Goog-Expires=901&X-Goog-SignedHeaders=host&X-Goog-Signature=a1429a851fe883be0a5c11b1241aa3ed13ddf2193da36944d9a824d78209c7faa0df3bfcbe8983c9f79aa560fe0f8a5dc825c8536d55d49121d5e91f623cc9d9cff1259dfb95097950e61dca3ce1511459ded14ab18cae7b4660bf2af4fd0e9233443614000d5f663351a87a37f5f7ef2c58111f7d01b7df59e2ad3eeaa33f341f8ac8bb7ce6aa97c07aeeef7915b6bba092a20e2a3381aa07a5b1f991c9a44d706b0a3aaca8a012d7ec7d54aa7323e36d4d22bb9fc94eb51960f8d1e29438e5da2ca5f0e8ffa515c864195ba7c572576326fbe4a21cfd49186765f0e8d94ff6655efc8e833ceb872b9b40a1baef9466da902e93de110280bc0123d64ff3fa07"
              >
                PDF Signed Urls
              </a>
            </div>
            <div>
              From local BE:{" "}
              <a
                className="text-blue-400 underline hover:no-underline"
                href="http://localhost:4040/tes"
              >
                PDF Local
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </InsurancePage>
  );
}
