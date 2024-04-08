const {get_query_database}= require("../../config/database_utlis")
exports.get_sales_dashboard_data = async(req, res) => {
    try{
        const category = req.query.category;
        const query = `
        SELECT model.name AS model_name, SUM(test_stock.quantity) AS total_quantity
        FROM test_stock
        JOIN model ON test_stock.model = model.id
        JOIN category ON test_stock.category = category.id
        WHERE category = ?
        GROUP BY model.name
        `;

        const result = await get_query_database(query,[category]);
        res.json(result)
    }
    catch (error) {
        console.log("Error fetching sales dashboard data", error)
        res.status(500).json({error: "Internal Server Error"})
    }
}