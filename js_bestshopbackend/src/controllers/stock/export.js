const { get_query_database } = require("../../config/database_utlis");

exports.get_csv = async (req, res) => {
  const { date, shop_location, bill_number } = req.query;
  if (!date || !shop_location) {
    return res.status(400).json({
      err: "Date and shop location are required",
    });
  }
  try {
    let query = `SELECT 
        it.name AS ItemName, 
        s.quantity AS QTY, 
        s.purchasing_price AS PurchasePrice, 
        s.selling_price AS SellingPrice, 
        s.mrp AS MRP, 
        c.name AS "MAIN CATEGORY", 
        sc.name AS "SUB CATEGORY", 
        b.name AS BRAND, 
        si.name AS SIZES, 
        m.name AS "STYLE MODE", 
        co.name AS COLOUR
    FROM 
        stock s
    INNER JOIN 
        item_name it ON s.item_name = it.id
    INNER JOIN  
        category c ON s.category = c.id
    INNER JOIN 
        sub_category sc ON s.sub_category = sc.id
    INNER JOIN  
        brand b ON s.brand = b.id
    INNER JOIN 
        size si ON s.size = si.id
    INNER JOIN 
        model m ON s.model = m.id
    INNER JOIN 
        color co ON s.color = co.id
    WHERE s.date = ? AND s.shop_location = ?`;

    const query_params = [date, shop_location];
    if (bill_number) {
      query += ` AND s.bill_number = ?`;
      query_params.push(bill_number);
    }

    const csv_data = await get_query_database(query, query_params);
    res.json(csv_data);
  } catch (err) {
    console.error("Error fetching csv data:", err);
    res.status(500).json({ error: err.message });
  }
};
