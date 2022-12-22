/* eslint-disable no-unused-vars */
const insurances = [
  {
    id: 1,
    customerId: "a2fc63dc-550a-4434-8c87-d2de5a2bc303",
    no: "ELI0001",
    price: "20000",
    transactioProof: "BUKTI_TRANSAKSI_20221012062129.pdf",
    insuranceCertificate: "ELI_INSURANCE_CERTIFICATE_20221012062129.pdf",
    coverageAmount: "1000000",
    coverageStart: "2022-11-11T06:21:29.000Z",
    coverageEnd: "2022-11-11T06:21:29.000Z",
    date: "2022-11-11T06:21:29.000Z",
    paymentDate: "2022-11-11T06:21:29.000Z",
    createdDate: "2022-11-11T06:21:29.000Z",
    updatedDate: "2022-11-11T06:21:29.000Z",
    status: "Pending",
    insuranceProduct: {
      name: "Critical Illnes",
      price: "20000",
      provider: {
        name: "ELI",
        company: "PT A",
      },
    },
  },
  {
    id: 2,
    customerId: "a2fc63dc-550a-4434-8c87-d2de5a2bc303",
    no: "ELI0002",
    price: "20000",
    transactioProof: "BUKTI_TRANSAKSI_20221012062129.pdf",
    insuranceCertificate: "ELI_INSURANCE_CERTIFICATE_20221012062129.pdf",
    coverageAmount: "1000000",
    coverageStart: "2022-11-11T06:21:29.000Z",
    coverageEnd: "2022-11-11T06:21:29.000Z",
    date: "2022-11-11T06:21:29.000Z",
    paymentDate: "2022-11-11T06:21:29.000Z",
    createdDate: "2022-11-11T06:21:29.000Z",
    updatedDate: "2022-11-11T06:21:29.000Z",
    status: "Pending",
    insuranceProduct: {
      name: "Critical Illnes",
      price: "20000",
      provider: {
        name: "ELI",
        company: "PT A",
      },
    },
  },
];

const insurancePlans = [
  {
    id: 1,
    customerId: "123",
    coverageAmount: 2500000,
    coverageStart: "2022-09-08T11:00:00.000Z",
    coverageEnd: "2022-12-22T00:00:00.000Z",
    isDelete: false,
    partnerReferenceNo: "1",
    productId: 1,
    receiptNo: "1-123",
    transactionAmount: 1000,
    transactionDate: "",
    transactionStatus: "",
    transactionProof: "",
    insuranceCertificate: "",
    insurancePolis: "My_CI_Protection_QRIS_392343",
    insuranceProduct: {
      id: 1,
      name: "Critical Illness Insurance",
      price: 1,
      provider: {
        id: 1,
        name: "My Critical Illness",
        company: "Tap In Insurance",
        logo: "",
      },
    },
  },
  {
    id: 2,
    customerId: "123",
    coverageAmount: 1000000,
    coverageStart: "2022-09-25T10:35:00.000Z",
    coverageEnd: "2022-12-24T17:00:00.000Z",
    isDelete: false,
    partnerReferenceNo: "1",
    productId: 1,
    receiptNo: "1-124",
    transactionAmount: 1000,
    transactionDate: "",
    transactionStatus: "",
    transactionProof: "",
    insuranceCertificate: "",
    insurancePolis: "My_CI_Protection_QRIS_392344",
    insuranceProduct: {
      id: 1,
      name: "Critical Illness Insurance",
      price: 1,
      provider: {
        id: 1,
        name: "My Critical Illness",
        company: "Tap In Insurance",
        logo: "",
      },
    },
  },
  {
    id: 3,
    customerId: "123",
    coverageAmount: 1500000,
    coverageStart: "2022-10-05T09:30:00.000Z",
    coverageEnd: "2022-11-04T17:00:00.000Z",
    isDelete: false,
    partnerReferenceNo: "1",
    productId: 1,
    receiptNo: "1-129",
    transactionAmount: 1000,
    transactionDate: "",
    transactionStatus: "",
    transactionProof: "",
    insuranceCertificate: "",
    insurancePolis: "My_CI_Protection_QRIS_39234",
    insuranceProduct: {
      id: 1,
      name: "Critical Illness Insurance",
      price: 1,
      provider: {
        id: 1,
        name: "My Critical Illness",
        company: "Tap In Insurance",
        logo: "",
      },
    },
  },
];

const resPlan400 = {
  meta: {
    code: "400",
    title: "Insurance Plan",
    message: "Failed",
  },
  data: {},
  paging: {},
};

export const insurancePlanList = { meta: { code: "200" }, insurancePlans };

export const insurancePlanDetail = ({ code = 200, id = 1 }) => {
  if (typeof id === "number" && code === 200)
    return insurancePlans.find((item) => item.id === id);
  else return resPlan400;
};
