const fs = require("fs");
const path = require("path");
const db = require("../util/database");

const Cart = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * from products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id= ?", [id]);
  }

  static deleteById(id) {}

  saveFromFile() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id == this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAllFromFile(cb) {
    getProductsFromFile(cb);
  }

  static findByIdFromFile(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id == id);
      cb(product);
    });
  }

  static deleteByIdFromFile(id, price) {
    getProductsFromFile((products) => {
      const updatedProducts = [...products];
      const prod = updatedProducts.find((item) => item.id == id);
      const deletedList = updatedProducts.filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(deletedList), (err) => {
        console.log(err);
        if (!err) {
          Cart.deleteProduct(id, prod.price);
        }
      });
    });
  }
};

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
