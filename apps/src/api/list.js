const apiList = [
  {
    url: "token",
    children: [
      {
        name: "getToken",
        url: "get",
        method: "POST",
      },
    ],
  },
  {
    url: "article",
    name: "createArticle",
    method: "POST",
    children: [
      {
        name: "getArticleList",
        url: "list",
        method: "POST",
      },
      {
        name: "getArticleDetail",
        url: "detail",
        method: "POST",
      },
    ],
  },
  {
    url: "v1",
    children: [
      {
        name: "insurancePlans",
        url: "insurancePlans",
        children: [
          { name: "transactionProof", url: "/:id/transctionProof" },
          { name: "insuranceCertificate", url: "/:id/insuranceCertificate" },
        ],
      },
      {
        url: "gcs",
        children: [
          {
            name: "downloadFile",
            url: "downloadFile",
          },
        ],
      },
    ],
  },
];

export default apiList;
