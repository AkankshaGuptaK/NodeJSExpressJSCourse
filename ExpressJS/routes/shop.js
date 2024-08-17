const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");
const adminData = require("../routes/admin");

router.get("/", (req, res, next) => {
  console.log("Shop Router");
  const products = adminData.products;
  //   let filePath = path.join(rootDir, "views", "shop.html");
  //   res.sendFile(filePath);
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/shop",
    hasProducts: products.length > 0 ? true : false,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
