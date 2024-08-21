const path = require("path");
const rootDir = require("../util/path");

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        hasProducts: products.length > 0 ? true : false,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([rows, fieldData]) => {
    const prod = rows[0];
    res.render("shop/product-details", {
      product: prod,
      pageTitle: prod.title,
      path: "/products",
    })
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        let foundCart = cart.products.find((prod) => prod.id == product.id);
        if (foundCart) {
          cartProducts.push({ productData: product, qty: foundCart.qty });
        }
      }

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product?.price);
    res.redirect("/cart");
  });
};

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product?.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
