const { get_query_database, post_query_database } = require("../../config/database_utlis");

exports.get_category = async (req, res) => {
  try {
    const query = `
      SELECT id, name, image_path
      FROM category
      WHERE status = '1'
    `;

    const categories = await get_query_database(query);
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

exports.post_category = async (req, res) => {
  const { name, image_path } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "name is required!!",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      INSERT INTO category (name, image_path)
      VALUES (?, ?)
    `;

    const success_message = await post_query_database(
      query,
      [formatted_name, image_path],
      "Category added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: "Error adding category" });
  }
};

exports.update_category = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: "id and name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      UPDATE category
      SET name = ?
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Category updated successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: "Error updating category" });
  }
};

exports.delete_category = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "ID is required",
    });
  }

  try {
    const query = `
      UPDATE category
      SET status = '0'
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [id],
      "Category deleted successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Error deleting category" });
  }
};
