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
        const query = `INSERT INTO purchase_requests (shop_location, master_user, category, item_name, sub_category, brand, model, color, size, quantity, product_image, supplier, emergency, status) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
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
        ];

        const result = await post_query_database(query, values);

        res.json(result)
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send("Internal server error");
    }
};

exports.getPurchaseRequest = async (req, res) => {
    try {
        // SQL query to retrieve all purchase requests
        const query = `SELECT * FROM purchase_requests;`;

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


