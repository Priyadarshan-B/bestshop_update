const bcrypt = require("bcrypt");
const {
    get_query_database,
    post_query_database,
} = require("../../config/database_utlis");

exports.post_signup = async (req, res) => {
    const { location, name, number, password, role } = req.body;
    if (!location || !name || !number || !password || !role) {
        return res.status(400).json({
            err: "Location, name, number, password are required",
        });
    }
    try {
        const existing_user_query = `SELECT name FROM master_user WHERE name = ?`;
        const [existing_user] = await get_query_database(existing_user_query, [
            name,
        ]);
        if (existing_user) {
            return res
                .status(400)
                .json({ message: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const query = `INSERT INTO master_user(location, name, number, password, role)
        VALUES (?, ?, ?, ?, ?)`;
        const success_message = await post_query_database(
            query,
            [location, name, number, hashed_password, role],
            "User added successfully"
        );
        res.json(success_message)
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ error: "Error adding user" });
    }
};
