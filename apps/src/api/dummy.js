/* eslint-disable no-unused-vars */

export const transactionPlanList = ({ code = 200 }) => {
  const meta = { code: "200" };
  const metaFail = { title: "Transaction Plan List", message: "Failed" };
  const insurancePlans = [
    {
      id: 1,
      customerId: "123",
      coverageAmount: 1000000,
      coverageStart: "2022-09-08T11:00:00.000Z",
      coverageEnd: "2022-10-07T17:00:00.000Z",
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
      coverageEnd: "2022-10-24T17:00:00.000Z",
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
      coverageAmount: 1000000,
      coverageStart: "2022-10-05T09:30:00.000Z",
      coverageEnd: "2022-11-04T17:00:00.000Z",
      isDelete: false,
      partnerReferenceNo: "1",
      productId: 1,
      receiptNo: "1-125",
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

  const success = { meta, insurancePlans };
  const failed = { meta: { ...meta, metaFail }, data: {}, paging: {} };

  if (code === 400) return failed;

  return success;
};

export const transactionPlanDetail = ({ code = 200 }) => {};
