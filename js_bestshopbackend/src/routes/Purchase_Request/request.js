const express = require("express");
const PurchaseRequest = require('../../controllers/Purchase_Request/request')
const router = express.Router()

router.post("/requests", PurchaseRequest.postPurchaseRequest)
router.get("/requests", PurchaseRequest.getPurchaseRequest)
router.put("/requests", PurchaseRequest.deletePurchaseRequest)



module.exports = router;