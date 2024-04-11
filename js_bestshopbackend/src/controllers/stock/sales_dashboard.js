const { get_query_database } = require("../../config/database_utlis");

exports.get_sales_dashboard_data = async (req, res) => {
  try {
    const category = req.query.category;
    const query = `
    SELECT 
    item_name.name AS itemname,
    SUM(test_stock.sell_quantity) AS available_quantity,
    SUM(test_stock.quantity) AS total_quantity
    FROM test_stock
    JOIN item_name ON test_stock.item_name = item_name.id
    JOIN category ON test_stock.category = category.id
    WHERE category.id = ?
    GROUP BY item_name.name;
        `;

    const result = await get_query_database(query, [category]);

    // Extract model names and total quantities into separate arrays
    const itemId = result.map(item=>item.itemid)
    const itemNames = result.map(item => item.itemname);
    const totalQuantities = result.map(item => parseInt(item.total_quantity));
    const availability = result.map(item=> parseInt(item.available_quantity));

    // Send separate arrays in response
    res.json({itemIds:itemId, item_names: itemNames, total_quantities: totalQuantities, available_quantity: availability });
  } catch (error) {
    console.log("Error fetching sales dashboard data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
