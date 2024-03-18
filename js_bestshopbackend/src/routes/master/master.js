const express = require("express");

const shop_location = require("../../controllers/master/shop_location");
const role = require("../../controllers/master/role");

const router = express.Router();

router.get("/shop-location", shop_location.get_shop_location);
router.post("/shop-location", shop_location.post_shop_location);
router.put("/shop-location", shop_location.update_shop_location);
router.delete("/shop-location", shop_location.delete_shop_location);

router.get("/role", role.get_role);
router.post("/role", role.post_role);
router.put("/role", role.update_role);
router.delete("/route", role.delete_role);

module.exports = router;
