import PolisAccordion from "../../components/Accordion/PolisAccordion";

const polisData = [
  {
    name: "Polis 1",
    startDate: 1662634800000,
    endDate: 1665162000000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 111,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
  {
    name: "Polis 2",
    startDate: 1664102100000,
    endDate: 1666630800000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 222,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
  {
    name: "Polis 3",
    startDate: 1664962200000,
    endDate: 1667581200000,
    certificate: {
      fileName: "Ketentuan_Polis_My_CI_Protection.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
    transcation: {
      name: 333,
      fileName: "Sertifikat_Polis_My_CI_Protection_QRIS_341-111.pdf",
      file: "./assets/sample-file/GG_2.0_Front_End_Class_Final_Project.pdf",
    },
  },
];

export default function InsuranceDocument() {
  return (
    <div className="p-5">
      <div className="p-2.5 mb-16">
        <PolisAccordion
          title="My_CI_Protection_QRIS_392343"
          polisData={polisData}
        />
        <PolisAccordion
          title="Inactive Insurance"
          polisData={polisData}
          inactive
        />
      </div>
    </div>
  );
}
