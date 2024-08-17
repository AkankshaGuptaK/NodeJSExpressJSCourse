const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  // let filePath = path.join(rootDir, "views", "add-product.html");
  // res.sendFile(filePath);

  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  });
});

router.post("/add-product", (req, res, next) => {
  console.log(JSON.parse(JSON.stringify(req.body)));
  products.push({ title: req.body.title });
  res.redirect("/shop");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
