const express = require("express");
const sales = require("../../controllers/stock/sales")
const router = express.Router()

router.post("/sales",sales.updateStock)

module.exports = router;