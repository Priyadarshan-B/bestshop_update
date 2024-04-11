const express = require("express");

const stock = require("../../controllers/stock/stock");
const csv = require("../../controllers/stock/export");
const dashboard_data = require("../../controllers/stock/dashboard")
const sales_dashboard_data = require("../../controllers/stock/sales_dashboard")
const model_dashboard_data = require("../../controllers/stock/model_dashboard")
const product_data = require("../../controllers/stock/products_page")
const products = require("../../controllers/stock/products")

const router = express.Router();

router.get("/stock", stock.get_stocks)
router.post("/stock", stock.post_stocks)
router.put("/stock", stock.update_stocks)
router.delete("/stock", stock.delete_stocks)

router.get("/export-csv", csv.get_csv)

router.get("/dashboard-data", dashboard_data.get_dashboard_data)

router.get("/sales-dashboard", sales_dashboard_data.get_sales_dashboard_data)

router.get("/model-dashboard", model_dashboard_data.get_model_dashboard_data)

router.get("/products",products.get_products)

router.get("/products/item", product_data.get_products_page)
module.exports = router;
