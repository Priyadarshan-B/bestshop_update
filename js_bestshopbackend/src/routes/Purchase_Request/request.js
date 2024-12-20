const express = require("express");
const PurchaseRequest = require('../../controllers/Purchase_Request/request')
const router = express.Router()

router.post("/requests", PurchaseRequest.postPurchaseRequest)
router.get("/requests", PurchaseRequest.getPurchaseRequest)
router.put("/requests", PurchaseRequest.placeOrder)
router.put("/orders", PurchaseRequest.receiveOrder)
router.get("/pending", PurchaseRequest.getPendingOrders)
router.get("/received", PurchaseRequest.getReceivedOrders)


module.exports = router;