const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_role = async (req, res) => {
  try {
    const query = `SELECT id, name 
          FROM master_roles
          WHERE status = '1'`;
    const roles = await get_query_database(query);
    res.json(roles);
  } catch (err) {
    console.error("Error fetching roles", err);
    res.status(500).json({
      error: "Error fetching roles",
    });
  }
};

exports.post_role = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "name is required",
    });
  }
  try {
    const formatted_name = name.toUpperCase();
    const query = `INSERT INTO master_roles(name)
          VALUES(?)`;
    const success_message = await post_query_database(
      query,
      [formatted_name],
      "Role added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error Adding Role:", err);
    res.status(500).json({ error: "Error Adding Role" });
  }
};

exports.update_role = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      err: "id and name are required",
    });
  }
  try {
    const formatted_name = name.toUpperCase();
    const query = `UPDATE master_roles
      SET name = ?
      WHERE id = ?`;
    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Role updated successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({
      error: "Error updating role",
    });
  }
};

exports.delete_role = async (req, res) => {
  const { id } = req.body;
  try {
    const query = `UPDATE master_roles
      SET status = '0'
      WHERE id = ?`;
    const success_message = await post_query_database(
      query,
      [id],
      "Role deleted successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).json({
      error: "Error deleting role",
    });
  }
};
