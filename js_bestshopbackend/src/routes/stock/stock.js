const express = require("express");

const stock = require("../../controllers/stock/stock");
const csv = require("../../controllers/stock/export");
const dashboard_data = require("../../controllers/stock/dashboard")

const router = express.Router();

router.get("/stock", stock.get_stocks)
router.post("/stock", stock.post_stocks)
router.put("/stock", stock.update_stocks)
router.delete("/stock", stock.delete_stocks)

router.get("/export-csv", csv.get_csv)

router.get("/dashboard-data", dashboard_data.get_dashboard_data)
module.exports = router;
