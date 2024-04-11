const { get_query_database, post_query_database } = require("../../config/database_utlis");

function parseJson(data) {
    return {
        category: data.category.trim(),
        sub_category: data.sub_category.trim(),
        brand: data.brand.trim(),
        size: parseInt(data.size),
        model: data.model.trim(),
        color: data.color.trim(),
        item_name: data.item_name.trim(),
        sell_quantity: parseInt(data.sell_quantity),
        mrp: parseFloat(data.mrp)
    };
}

// Function to check and update the stock
exports.updateStock = async (req, res) => {
    const responses = []; 

    for (let i = 0; i < req.body.length; i++) {
        const parsedData = parseJson(req.body[i]);

        try {
            const checkQuery = `
                SELECT ts.id, ts.sell_quantity
                FROM test_stock ts
                JOIN category c ON ts.category = c.id
                JOIN item_name i_name ON ts.item_name = i_name.id        
                JOIN sub_category sc ON ts.sub_category = sc.id
                JOIN brand b ON ts.brand = b.id
                JOIN model m ON ts.model = m.id
                JOIN color col ON ts.color = col.id
                JOIN size s ON ts.size = s.id
                WHERE c.name = ?
                AND i_name.name = ?
                AND sc.name = ?
                AND b.name = ?
                AND m.name = ?
                AND col.name = ?
                AND s.name = ?
                AND ts.sell_quantity >= ?
                LIMIT 1`;

            const checkResult = await get_query_database(checkQuery, [
                parsedData.category,
                parsedData.item_name,
                parsedData.sub_category,
                parsedData.brand,
                parsedData.model,
                parsedData.color,
                parsedData.size,
                parsedData.sell_quantity
            ]);

            if (checkResult.length > 0) {
                const updatedQuantity = checkResult[0].sell_quantity - parsedData.sell_quantity;
                const totalPrice = updatedQuantity * parsedData.mrp;
                console.log(updatedQuantity)

                // Update stock quantity
                const updateQuery = `
                    UPDATE test_stock
                    SET sell_quantity = ?,
                        total_price = ?
                    WHERE id = ?`;

                await post_query_database(updateQuery, [
                    updatedQuantity,
                    totalPrice,
                    checkResult[0].id
                ], "Stock updated successfully");
                
                responses.push({ message: "Stock updated successfully" });

                
            } else {
                responses.push({ error: "Item not found or insufficient quantity." });
            }
        } catch (err) {
            console.error("Error updating stock:", err);
            responses.push({ error: "Error updating stock" });
        }
    }

    res.json(responses);
};

