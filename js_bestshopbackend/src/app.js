// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

//routes
const structure_routes = require("./routes/structure/structure");
const stock_routes = require("./routes/stock/stock");
const sales_routes = require("./routes/stock/sales");
const auth_routes = require("./routes/auth/auth");
const master_routes = require("./routes/master/master");
const request_routes = require("./routes/Purchase_Request/request")
const authenticate_token = require("./middleware/authenticate_token");

//middleware logger config
const morgan_config = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

const app = express();
const port = process.env.DEV_PORT;
// const port = 5000;


// Enable CORS AND LOGGER MIDDLEWARE
const cors_config = {
  origin: '*'
}
app.use(cors(cors_config));
app.use(morgan_config);
app.use(express.json());

// Routes
// There is no need of token for login for sigin middleware is done in routes
app.use("/api/auth", auth_routes);
// To serve static images in my upload folder :
// console.log(__dirname+'/uploads')
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use("/api/structure", structure_routes);
app.use("/api/sales", sales_routes);
app.use("/api/requests", request_routes);

// app.use(authenticate_token);
app.use("/api/stock", stock_routes);

app.use("/api/master", master_routes);


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});