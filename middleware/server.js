require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");

const port = process.env.PORT || 8000;
const app = express();
const targetFolder = process.env.targetDIR || "../apps/build_deploy";

// Handle Security using Helmet and custom HSTS, Force SSL
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy: false,
  })
);

// Handle Security to decoded URL
app.use((req, res, next) => {
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) return res.redirect("/404");

  next();

  return true;
});

// Route to handle "/"
app.get("/", async (req, res, next) => {
  return next();
});

// Send files such as html, css, and js
app.use(express.static(path.join(__dirname, targetFolder)));

// Route to handle 404 error
app.get("/not-found", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, targetFolder, "index.html"));
});

//
//

//
//
// Route to handle every routing
app.get("/*", (req, res) => {
  const tokenName = "USER-ACCESS-TOKEN";
  const refTokenName = "USER-REFRESH-TOKEN";

  const istokenHeaders = req.headers[tokenName];
  const isrefTokenHeaders = req.headers[refTokenName];

  const istokenHeader = req.header[tokenName];
  const isrefTokenHeader = req.header[refTokenName];

  const tokenHeader = istokenHeaders || istokenHeader;
  const refTokenHeader = isrefTokenHeaders || isrefTokenHeader;

  const tokenBody = req.body ? req.body[tokenName] : "";
  const refTokenBody = req.body ? req.body[refTokenName] : "";

  const tokenQuery = req.query[tokenName] || "";
  const refTokenQuery = req.query[refTokenName] || "";

  const token = tokenHeader || tokenBody || tokenQuery;
  const refToken = refTokenHeader || refTokenBody || refTokenQuery;

  // if (token || refToken) {

  // }

  res.cookie(tokenName, istokenHeaders);
  res.cookie(refTokenName, isrefTokenHeaders);

  res.cookie("Server Loader", new Date());

  return res.sendFile(path.join(__dirname, targetFolder, "index.html"));
});

app.listen(port);
console.log(`Running on PORT: ${port}`);
