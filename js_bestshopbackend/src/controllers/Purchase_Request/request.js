const { get_query_database, post_query_database } = require("../../config/database_utlis");

exports.postPurchaseRequest = async (req, res) => {
    const {
        shop_location,
        master_user,
        category,
        item_name,
        sub_category,
        brand,
        model,
        color,
        size,
        quantity,
        supplier,
        emergency,
        status,
    } = req.body;

    const product_image = "sdbsd";
    if (
        !shop_location ||
        !master_user ||
        !category ||
        !item_name ||
        !sub_category ||
        !brand ||
        !model ||
        !size ||
        !quantity ||
        !product_image ||
        !supplier
    ) {
        return res.status(400).json({
            err: "All required fields must be filled",
        });
    }

    try {
        const requested_date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date in 'YYYY-MM-DD HH:MM:SS' format

        const query = `INSERT INTO purchase_requests (shop_location, master_user, category, item_name, sub_category, brand, model, color, size, quantity, product_image, supplier, emergency, status, requested_date) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const values = [
            shop_location,
            master_user,
            category,
            item_name,
            sub_category,
            brand,
            model,
            color,
            size,
            quantity,
            product_image,
            supplier,
            emergency,
            status,
            requested_date,
        ];

        const result = await post_query_database(query, values);

        res.json(result);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send("Internal server error");
    }
};


exports.getPurchaseRequest = async (req, res) => {
    try {
        // SQL query to retrieve all purchase requests
        const query = `SELECT
        pr.id AS id, 
    pr.brand AS brand, 
    pr.category AS category,
    pr.color AS color,
    pr.emergency AS emergency,
    pr.item_name AS item_name,
    u.name AS master_user, 
    pr.model AS model,
    pr.product_image AS product_image,
    pr.quantity AS quantity,
    s.name AS shop_location,
    pr.size AS size,
    pr.status AS status,
    pr.sub_category AS sub_category,
    pr.requested_date AS requested_date,
    pr.supplier AS supplier
FROM 
    purchase_requests pr
LEFT JOIN 
    shop_location s ON pr.shop_location = s.id
LEFT JOIN 
    master_user u ON pr.master_user = u.id
    WHERE 
    pr.status = '1';
`;

        // Execute the query using the database utility function
        const result = await get_query_database(query);

        // Check if the query returns any results
        if (result.length > 0) {
            res.status(200).json(result); // Send data as a JSON response
        } else {
            res.status(404).json({ message: "No purchase requests found" });
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send("Internal server error");
    }
};


exports.deletePurchaseRequest = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            err: "ID is required",
        });
    }

    try {
        const query = `UPDATE purchase_requests SET status = '0' WHERE id = ?;`;
        const values = [id];

        const result = await post_query_database(query, values);

        res.json({
            message: "Purchase request status updated to '0' successfully",
            result,
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send("Internal server error");
    }
};
