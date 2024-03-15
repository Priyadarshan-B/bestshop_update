const { get_query_database, post_query_database } = require("../../config/database_utlis");

exports.get_sub_category = async (req, res) => {
  const item_name = req.query.item_name;

  if (!item_name) {
    return res.status(400).json({
      error: "Item_name is required in query!!",
    });
  }

  try {
    const query = `
      SELECT id, name, image_path
      FROM sub_category
      WHERE item_name = ?
      AND status = '1'
    `;

    const sub_categories = await get_query_database(query, [item_name]);
    res.json(sub_categories);
  } catch (err) {
    console.error("Error fetching sub-categories:", err);
    res.status(500).json({ error: "Error fetching sub-categories" });
  }
};

exports.post_sub_category = async (req, res) => {
  const { item_name, name, image_path } = req.body;

  if (!item_name || !name) {
    return res.status(400).json({
      error: "item_name and name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      INSERT INTO sub_category (item_name, name, image_path)
      VALUES (?, ?, ?)
    `;

    const success_message = await post_query_database(
      query,
      [item_name, formatted_name, image_path],
      "Sub-category added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error adding sub-category:", err);
    res.status(500).json({ error: "Error adding sub-category" });
  }
};

exports.update_sub_category = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: "id and name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      UPDATE sub_category
      SET name = ?
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Sub-category updated successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating sub-category:", err);
    res.status(500).json({ error: "Error updating sub-category" });
  }
};

exports.delete_sub_category = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "ID is required",
    });
  }

  try {
    const query = `
      UPDATE sub_category
      SET status = '0'
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [id],
      "Sub-category deleted successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error deleting sub-category:", err);
    res.status(500).json({ error: "Error deleting sub-category" });
  }
};
