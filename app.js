const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemsRoutes);

app.use(function (request, response, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((error, request, response, next) => {
  response.status(error.status || 500);

  return response.json({
    error: error.message,
  });
});

module.exports = app
