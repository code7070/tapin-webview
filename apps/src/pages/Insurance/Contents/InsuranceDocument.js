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
                download
                href="https://storage.googleapis.com/exmens/insurance/20230106041313.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=708060060306-compute%40developer.gserviceaccount.com%2F20230123%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230123T082141Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=7fb2efa1220130c1b1306a8c4043271b7349dd2fcb903ba3dd403c62707c0cf6686301cf8aa4c8022e01fd600dad6ee1fb7f9a2ede7cd47a87904b5cc007c0ee172ebaf91c6c95db8515e796f643021adf6612b3a0b2f0bcc8a4a155c61a27c6d5a1a1cab008a748157bd0a9276860b0202d0c456e09219383af0d55d2095c5d7e13624559c86c5e5756d025e04637965d9e71f6820f17583ba74dc19fc53c7e054a4ba385b2e16f0b4979e5a90e625180bdf6a73708e6a2c87acd156f5a2f4d1c75587dcdfdc68b5a12591920f8e912f462e651c1de83e83f43ce0236b9d4efc3c11cb3e80f7867ab5bb00ab6d128fbc5bf0a85f045f26cc9b30c95df92329e"
              >
                PDF Signed Urls
              </a>
            </div>
            <div>
              From local BE: <a href="http://localhost:4040/tes">PDF Local</a>{" "}
            </div>
          </div>
        </div>
      </div>
    </InsurancePage>
  );
}
