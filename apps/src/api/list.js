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
      },
    ],
  },
];

export default apiList;
