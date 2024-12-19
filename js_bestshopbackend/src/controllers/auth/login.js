const bcrypt = require("bcrypt");
const { get_query_database } = require("../../config/database_utlis");
const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

exports.post_login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({
            err: "name and password are required",
        });
    }
    try {
        const query = `SELECT id, location, name, password, role
                       FROM master_user 
                       WHERE name = ? AND status = '1'`;
        const [user_detail] = await get_query_database(query, [name]);
        if (!user_detail) {
            return res.status(404).json({ err: "User not found" });
        }
        // Decrypting the password
        const is_password_valid = await bcrypt.compare(
            password,
            user_detail.password
        );
        if (!is_password_valid) {
            return res.status(401).json({ err: "Invalid password" });
        }
        // Preparing payload for JWT
        const token_payload = {
            id: user_detail.id,
            location: user_detail.location,
        };
        const token = jwt.sign(token_payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        delete user_detail.password;
        return res
            .status(200)
            .json({ message: "Login successful", token: token, username: user_detail.name });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal server error" });
    }
};
exports.get_users = async (req, res) => {
    try {
        // SQL query to fetch active users
        const query = `
            SELECT id, name
            FROM master_user
            WHERE status = '1'
        `;

        // Execute the query
        const result = await get_query_database(query);

        // Send the response with fetched data
        res.status(200).json({
            users: result,
        });
    } catch (err) {
        // Log the error for debugging
        console.error("Error fetching users:", err);

        // Send a 500 Internal Server Error response
        return res.status(500).json({ err: "Internal server error" });
    }
};

