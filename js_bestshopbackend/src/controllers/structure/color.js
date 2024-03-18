const {get_query_database, post_query_database} = require("../../config/database_utlis")


exports.get_color = async (req, res) => {
  const model = req.query.model;

  if (!model) {
    return res.status(400).json({
      error: "model is required in query!!",
    });
  }

  try {
    const query = `
      SELECT id, name
      FROM color
      WHERE model = ?
      AND status = '1'
    `;

    const colors = await get_query_database(query, [model]);
    res.json(colors);
  } catch (err) {
    console.error("Error fetching colors:", err);
    res.status(500).json({ error: "Error fetching colors" });
  }
};

exports.post_color = async (req, res) => {
  const { model, name } = req.body;

  if (!model || !name) {
    return res.status(400).json({
      error: "model and color name are required",
    });
  }

  try {
    const formattedName = name.toUpperCase();
    const query = `
      INSERT INTO color (model, name)
      VALUES (?, ?)
    `;

    const successMessage = await post_query_database(
      query,
      [model, formattedName],
      "Color added successfully"
    );
    res.json({ message: successMessage });
  } catch (err) {
    console.error("Error adding color:", err);
    res.status(500).json({ error: "Error adding color" });
  }
};

exports.update_color = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: "id and name are required",
    });
  }

  try {
    const formattedName = name.toUpperCase();
    const query = `
      UPDATE color
      SET name = ?
      WHERE id = ?
    `;

    const successMessage = await post_query_database(
      query,
      [formattedName, id],
      "Color updated successfully"
    );
    res.json({ message: successMessage });
  } catch (err) {
    console.error("Error updating color:", err);
    res.status(500).json({ error: "Error updating color" });
  }
};

exports.delete_color = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "ID is required",
    });
  }

  try {
    const query = `
      UPDATE color
      SET status = '0'
      WHERE id = ?
    `;

    const successMessage = await post_query_database(
      query,
      [id],
      "Color deleted successfully"
    );
    res.json({ message: successMessage });
  } catch (err) {
    console.error("Error deleting color:", err);
    res.status(500).json({ error: "Error deleting color" });
  }
};