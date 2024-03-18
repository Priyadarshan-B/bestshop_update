const { get_query_database, post_query_database } = require("../../config/database_utlis");

exports.get_size = async (req, res) => {
  let color = req.query.color;

  if (!color) {
    return res.status(400).json({
      error: "color is required in query!!",
    });
  }

  try {
    const query = `
      SELECT id, name
      FROM size 
      WHERE color = ?
      AND status = '1'`;

    const sizes = await get_query_database(query, [color]);
    res.json(sizes);
  } catch (err) {
    console.error("Error fetching sizes:", err);
    res.status(500).json({ error: "Error fetching sizes" });
  }
};

exports.post_size = async (req, res) => {
  const { color, name } = req.body;
  if (!color || !name) {
    return res.status(400).json({
      error: "color and size name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      INSERT INTO size(color, name)
      VALUES (?, ?)`;

    const success_message = await post_query_database(
      query,
      [color, formatted_name],
      "Size added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error adding size:", err);
    res.status(500).json({ error: "Error adding size" });
  }
};

exports.update_size = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      error: "id and name are required",
    });
  }
  try {
    const formatted_name = name.toUpperCase();
    const query = `
      UPDATE size
      SET name = ?
      WHERE id = ?`;

    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Size updated successfully"
    );
    res.json(success_message);
  } catch (err) {
    console.error("Error updating size:", err);
    res.status(500).json({ error: "Error updating size" });
  }
};

exports.delete_size = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      error: "ID is required",
    });
  }

  try {
    const query = `
      UPDATE size
      SET status = '0'
      WHERE id = ?`;

    const success_message = await post_query_database(
      query,
      [id],
      "Size deleted Successfully"
    );
    res.json(success_message);
  } catch (err) {
    console.error("Error deleting size:", err);
    res.status(500).json({ error: "Error deleting size" });
  }
};
