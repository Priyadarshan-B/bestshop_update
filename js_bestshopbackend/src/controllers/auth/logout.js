const {post_query_database} = require("../../config/database_utlis")

const store_revoked_tokens = async (token) => {
    const query = "INSERT INTO revoked_tokens (token) VALUES (?)";
    await post_query_database(query, [token]);
};

const revoke_token = async (token) => {
    if (token) {
        await store_revoked_tokens(token);
    }
};

exports.post_logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    await revoke_token(token);
    res.json({ message: "Logout successful" });
};
