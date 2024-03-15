const express = require("express");

const category = require("../../controllers/structure/category");
const item_name = require("../../controllers/structure/item_name");
const sub_category = require("../../controllers/structure/sub_category");
const brand = require("../../controllers/structure/brand");
const model = require("../../controllers/structure/model");
const color = require("../../controllers/structure/color");
const size = require("../../controllers/structure/size");
const image_uploader_middleware = require("../../middleware/image_uploader");

const router = express.Router();

router.get("/category", category.get_category);
router.post("/category", image_uploader_middleware, category.post_category);
router.put("/category", category.update_category);
router.delete("/category", category.delete_category);

router.get("/item-name", item_name.get_item_name);
router.post("/item-name", image_uploader_middleware, item_name.post_item_name);
router.put("/item_name", item_name.update_item_name);
router.delete("/item_name", item_name.delete_item_name);

router.get("/sub-category", sub_category.get_sub_category);
router.post(
  "/sub-category",
  image_uploader_middleware,
  sub_category.post_sub_category
);
router.put("/sub-category", sub_category.update_sub_category);
router.delete("sub-category", sub_category.delete_sub_category);

router.get("/brand", brand.get_brand);
router.post("/brand", image_uploader_middleware, brand.post_brand);
router.put("/brand", brand.update_brand);
router.delete("/brand", brand.delete_brand);

router.get("/model", model.get_model);
router.post("/model", model.post_model);
router.put("/model", model.update_model);
router.delete("/model", model.delete_model);

router.get("/color", color.get_color);
router.post("/color", color.post_color);
router.put("/color", color.update_color);
router.delete("/color", color.delete_color);

router.get("/size", size.get_size);
router.post("/size", size.post_size);
router.put("/size", size.update_size);
router.delete("size", size.delete_size);

module.exports = router;
