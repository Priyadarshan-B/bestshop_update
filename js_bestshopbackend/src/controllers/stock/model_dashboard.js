const { get_query_database } = require("../../config/database_utlis");

exports.get_model_dashboard_data = async (req, res) => {
  try {
    const item_name = req.query.item_name;
    const query = `
        SELECT
        model.name AS model_name,
        SUM(test_stock.sell_quantity) AS available_quantity,
        SUM(test_stock.quantity) AS total_quantity
        FROM test_stock
        JOIN model ON test_stock.model = model.id
        Join item_name ON test_stock.item_name = item_name.id
        WHERE item_name.id = ?
        GROUP BY model.name;
        `;
    const result = await get_query_database(query, [item_name]);
    

    res.json(result);
  } catch (err) {
    console.error("Error fetching model data:", err);
    res.status(500).json({
      err: "Error fetching model data",
    });
  }
};
