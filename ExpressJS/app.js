const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const engine = require("express-handlebars");

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

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use("/shop", shopRoutes);

app.use((req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
  res.status(404).render("notfound", { pageTitle: "Page not found", path:'notfound' });
});

app.listen(5000);
