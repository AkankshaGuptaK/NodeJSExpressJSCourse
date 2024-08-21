const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const engine = require("express-handlebars");
const errorController = require("./controllers/error");
const db = require("./util/database");

const app = express();

// app.engine(
//   "hbs",
//   engine({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use("/shop", shopRoutes);

app.use(errorController.get404);

app.listen(5000);
