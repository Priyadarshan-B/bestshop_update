const { get_query_database } = require("../../config/database_utlis");

exports.get_products_page = async (req, res) => {
  try {
    const item_name = req.query.item_name;
    const query = `
        SELECT 
          TRIM(category.name) AS category_name, 
          TRIM(sub_category.name) AS subcategory_name, 
          TRIM(item_name.name) AS itemname_name, 
          TRIM(brand.name) AS brand_name, 
          TRIM(model.name) AS model_name, 
          item_name.image_path AS item_image,
          TRIM(color.name) AS color_name, 
          TRIM(size.name) AS size_name,
          test_stock.mrp AS price,
          SUM(test_stock.quantity) AS total_quantity, 
          CAST(ROUND((SUM(test_stock.sell_quantity) / SUM(test_stock.quantity)) * 100, 2) AS DECIMAL(10,0)) AS availability
        FROM 
          test_stock
        LEFT JOIN 
          category ON test_stock.category = category.id
        LEFT JOIN 
          sub_category ON test_stock.sub_category = sub_category.id
        LEFT JOIN 
          item_name ON test_stock.item_name = item_name.id
        LEFT JOIN 
          brand ON test_stock.brand = brand.id
        LEFT JOIN 
          model ON test_stock.model = model.id
        LEFT JOIN
          size ON test_stock.size = size.id
        LEFT JOIN 
          color ON test_stock.color = color.id
        WHERE item_name.id = ?
        GROUP BY 
          category_name, 
          subcategory_name, 
          itemname_name, 
          brand_name, 
          model_name, 
          color_name,
          size_name,
          price;
      `;
    const products = await get_query_database(query, [item_name]);
    res.json(products);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ error: "Error fetching products" });
  }
};
